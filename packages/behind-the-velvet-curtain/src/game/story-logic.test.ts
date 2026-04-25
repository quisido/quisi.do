import { describe, expect, it } from 'vitest';
import { SCRIPT } from './script.js';
import { DEFAULT_STORAGE } from './storage.js';
import {
  canChooseTrustedGuide,
  canRevealInvitationPath,
  resolveEndingBranch,
  validateStoryScript,
} from './story-logic.js';

describe('DEFAULT_STORAGE', (): void => {
  it('starts in a neutral state', (): void => {
    expect(DEFAULT_STORAGE).toEqual({
      acceptedMask: false,
      foundInvitation: false,
      role: 'undecided',
      trustedStagehand: false,
    });
  });
});

describe('choice gating', (): void => {
  it('reveals the invitation path only after the clue is found', (): void => {
    expect(canRevealInvitationPath(DEFAULT_STORAGE)).toBe(false);
    expect(
      canRevealInvitationPath({ ...DEFAULT_STORAGE, foundInvitation: true }),
    ).toBe(true);
  });

  it('enables the guided entrance only after Mara is trusted', (): void => {
    expect(canChooseTrustedGuide(DEFAULT_STORAGE)).toBe(false);
    expect(
      canChooseTrustedGuide({ ...DEFAULT_STORAGE, trustedStagehand: true }),
    ).toBe(true);
  });
});

describe('resolveEndingBranch', (): void => {
  it('routes to the hidden ending when all secret conditions are met', (): void => {
    expect(
      resolveEndingBranch({
        ...DEFAULT_STORAGE,
        acceptedMask: true,
        foundInvitation: true,
        role: 'investigator',
      }),
    ).toBe('SecretEnding');
  });

  it('does not grant the secret ending to the illusionist role', (): void => {
    expect(
      resolveEndingBranch({
        ...DEFAULT_STORAGE,
        acceptedMask: true,
        foundInvitation: true,
        role: 'illusionist',
      }),
    ).toBe('SoloEnding');
  });

  it('requires the invitation for the secret ending', (): void => {
    expect(
      resolveEndingBranch({
        ...DEFAULT_STORAGE,
        acceptedMask: true,
        foundInvitation: false,
        role: 'investigator',
      }),
    ).toBe('SoloEnding');
  });

  it('requires accepting the mask for the secret ending', (): void => {
    expect(
      resolveEndingBranch({
        ...DEFAULT_STORAGE,
        acceptedMask: false,
        foundInvitation: true,
        role: 'investigator',
      }),
    ).toBe('SoloEnding');
  });

  it('routes to the reconciliation ending when trust was established', (): void => {
    expect(
      resolveEndingBranch({
        ...DEFAULT_STORAGE,
        trustedStagehand: true,
      }),
    ).toBe('ReconciliationEnding');
  });

  it('prefers reconciliation over solo when stagehand is trusted', (): void => {
    expect(
      resolveEndingBranch({
        ...DEFAULT_STORAGE,
        role: 'illusionist',
        trustedStagehand: true,
      }),
    ).toBe('ReconciliationEnding');
  });

  it('falls back to the solo ending otherwise', (): void => {
    expect(resolveEndingBranch(DEFAULT_STORAGE)).toBe('SoloEnding');
  });
});

describe('SCRIPT', (): void => {
  it('references only labels that exist', (): void => {
    expect(validateStoryScript(SCRIPT)).toEqual({
      missingLabels: [],
      referencedLabels: [
        'BackstageNegotiation',
        'EndingRouter',
        'FinaleChoice',
        'IllusionistRoute',
        'InvestigatorRoute',
        'ReconciliationEnding',
        'SecretEnding',
        'SoloEnding',
      ],
    });
  });
});
