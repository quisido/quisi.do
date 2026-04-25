export const STORY_LABELS = [
  'Start',
  'IllusionistRoute',
  'InvestigatorRoute',
  'BackstageNegotiation',
  'FinaleChoice',
  'EndingRouter',
  'SecretEnding',
  'ReconciliationEnding',
  'SoloEnding',
] as const;

export type StoryLabel = (typeof STORY_LABELS)[number];

export type StoryRole = 'illusionist' | 'investigator' | 'undecided';

export interface StoryStorage {
  acceptedMask: boolean;
  foundInvitation: boolean;
  role: StoryRole;
  trustedStagehand: boolean;
}

export interface MonogatariAssetsPath {
  characters: string;
  root: string;
  scenes: string;
}

export interface MonogatariSettings {
  AllowRollback: boolean;
  AssetsPath: MonogatariAssetsPath;
  AutoSave: number;
  CenteredTypeAnimation: boolean;
  ExperimentalFeatures: boolean;
  ForceAspectRatio: 'None' | 'Visuals' | 'Global';
  Label: StoryLabel;
  LanguageSelectionScreen: boolean;
  MultiLanguage: boolean;
  NarratorTypeAnimation: boolean;
  NVLTypeAnimation: boolean;
  Orientation: 'any' | 'portrait' | 'landscape';
  Preload: boolean;
  ServiceWorkers: boolean;
  ShowMainScreen: boolean;
  Skip: number;
  SplashScreenLabel: string;
  TypeAnimation: boolean;
}

export interface StoryCharacter {
  color: string;
  default_expression: string;
  directory: string;
  name: string;
  sprites: Record<string, string>;
}

export type StoryCharacters = Record<string, StoryCharacter>;
export type SceneAssetMap = Record<string, string>;

export type StoryChoiceEffect = () => void | Promise<void>;
export type StoryCondition = () => unknown;
export type StoryStatementFunction = () => unknown;

export interface StoryChoiceOption {
  Class?: string;
  Clickable?: StoryCondition;
  Condition?: StoryCondition;
  Do: StoryStatement;
  onChosen?: StoryChoiceEffect;
  onRevert?: StoryChoiceEffect;
  Text: string;
}

export interface StoryChoiceBody {
  Class?: string;
  Dialog?: string;
  Timer?: Record<string, unknown>;
  [key: string]:
    | StoryChoiceOption
    | string
    | Record<string, unknown>
    | undefined;
}

export interface StoryChoiceStatement {
  Choice: StoryChoiceBody;
}

export interface StoryConditionalStatement {
  Conditional: {
    Condition: StoryCondition;
    [key: string]: StoryCondition | StoryStatement | undefined;
  };
}

export type StoryStatement =
  | StoryChoiceStatement
  | StoryConditionalStatement
  | StoryStatementFunction
  | string;

export type StoryScript = Record<StoryLabel, readonly StoryStatement[]>;

export interface StoryValidationResult {
  missingLabels: string[];
  referencedLabels: StoryLabel[];
}
