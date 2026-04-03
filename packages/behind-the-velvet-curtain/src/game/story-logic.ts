import {
  STORY_LABELS,
  type StoryChoiceStatement,
  type StoryConditionalStatement,
  type StoryLabel,
  type StoryScript,
  type StoryStatement,
  type StoryStorage,
  type StoryValidationResult,
} from './types.js';

const STORY_LABEL_SET: ReadonlySet<string> = new Set(STORY_LABELS);
const JUMP_PREFIX = 'jump ';

export const canRevealInvitationPath = (storage: StoryStorage): boolean => {
  return storage.foundInvitation;
};

export const canChooseTrustedGuide = (storage: StoryStorage): boolean => {
  return storage.trustedStagehand;
};

export const resolveEndingBranch = (storage: StoryStorage): StoryLabel => {
  if (
    storage.role === 'investigator' &&
    storage.foundInvitation &&
    storage.acceptedMask
  ) {
    return 'SecretEnding';
  }

  if (storage.trustedStagehand) {
    return 'ReconciliationEnding';
  }

  return 'SoloEnding';
};

const isChoiceStatement = (
  statement: unknown,
): statement is StoryChoiceStatement => {
  return (
    typeof statement === 'object' && statement !== null && 'Choice' in statement
  );
};

const isConditionalStatement = (
  statement: unknown,
): statement is StoryConditionalStatement => {
  return (
    typeof statement === 'object' &&
    statement !== null &&
    'Conditional' in statement
  );
};

const extractJumpTarget = (statement: string): StoryLabel[] => {
  if (!statement.startsWith(JUMP_PREFIX)) {
    return [];
  }

  const target = statement.slice(JUMP_PREFIX.length).trim();

  if (target === '') {
    return [];
  }

  return [target as StoryLabel];
};

const collectStatementTargets = (statement: StoryStatement): StoryLabel[] => {
  if (typeof statement === 'string') {
    return extractJumpTarget(statement);
  }

  if (typeof statement === 'function') {
    return [];
  }

  if (isChoiceStatement(statement)) {
    return Object.values(statement.Choice).flatMap(
      (choiceValue): StoryLabel[] => {
        if (typeof choiceValue !== 'object' || !('Do' in choiceValue)) {
          return [];
        }

        return collectStatementTargets(choiceValue.Do as StoryStatement);
      },
    );
  }

  if (isConditionalStatement(statement)) {
    return Object.entries(statement.Conditional).flatMap(
      ([branchName, branchValue]): StoryLabel[] => {
        if (branchName === 'Condition' || typeof branchValue === 'function') {
          return [];
        }

        return collectStatementTargets(branchValue as StoryStatement);
      },
    );
  }

  return [];
};

export const collectReferencedLabels = (script: StoryScript): StoryLabel[] => {
  return Object.values(script)
    .flatMap((statements): StoryLabel[] =>
      statements.flatMap((statement): StoryLabel[] =>
        collectStatementTargets(statement),
      ),
    )
    .filter(
      (target: StoryLabel, index: number, allTargets: StoryLabel[]): boolean =>
        allTargets.indexOf(target) === index,
    )
    .toSorted((left: StoryLabel, right: StoryLabel): number =>
      left.localeCompare(right),
    );
};

export const validateStoryScript = (
  script: StoryScript,
): StoryValidationResult => {
  const referencedLabels = collectReferencedLabels(script);
  const missingLabels = referencedLabels.filter(
    (label: StoryLabel): boolean => !STORY_LABEL_SET.has(label),
  );

  return {
    missingLabels,
    referencedLabels,
  };
};
