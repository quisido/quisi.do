import monogatari from '@monogatari/core';
import { DEFAULT_STORAGE } from './storage.js';
import {
  canChooseTrustedGuide,
  canRevealInvitationPath,
  resolveEndingBranch,
} from './story-logic.js';
import {
  type StoryLabel,
  type StoryScript,
  type StoryStorage,
} from './types.js';

const getStorage = (): StoryStorage => {
  const storedStorage = monogatari.storage() as
    | Partial<StoryStorage>
    | undefined;

  return {
    ...DEFAULT_STORAGE,
    ...(storedStorage ?? {}),
  };
};

const patchStorage = (
  patch: Partial<StoryStorage>,
): {
  onChosen: () => void;
  onRevert: () => void;
} => {
  let previousValues: Partial<StoryStorage> | null = null;

  return {
    onChosen: (): void => {
      const currentStorage = getStorage();
      previousValues = Object.fromEntries(
        Object.keys(patch).map(
          (key: string): [string, StoryStorage[keyof StoryStorage]] => [
            key,
            currentStorage[key as keyof StoryStorage],
          ],
        ),
      ) as Partial<StoryStorage>;
      monogatari.storage(patch);
    },
    onRevert: (): void => {
      if (previousValues !== null) {
        monogatari.storage(previousValues);
      }
    },
  };
};

const INVESTIGATOR_ROLE = patchStorage({ role: 'investigator' });
const ILLUSIONIST_ROLE = patchStorage({ role: 'illusionist' });
const FOUND_INVITATION = patchStorage({ foundInvitation: true });
const TRUSTED_STAGEHAND = patchStorage({ trustedStagehand: true });
const DISTRUSTED_STAGEHAND = patchStorage({ trustedStagehand: false });
const ACCEPTED_MASK = patchStorage({ acceptedMask: true });
const REJECTED_MASK = patchStorage({ acceptedMask: false });

export const SCRIPT: StoryScript = {
  BackstageNegotiation: [
    'show scene backstage with fadeIn',
    'show character mara steady at center with fadeIn',
    'mara:steady The troupe survives because someone always keeps the impossible moving.',
    'revel:concerned A silver invitation vanished from the archives. If you found it, the curtain hides more than applause.',
    {
      Choice: {
        Dialog:
          'mara:steady Decide whether Mara is your guide or just another actor protecting the illusion.',
        keepWatch: {
          ...DISTRUSTED_STAGEHAND,
          Do: 'jump FinaleChoice',
          Text: 'Keep your distance and investigate alone',
        },
        trustMara: {
          ...TRUSTED_STAGEHAND,
          Do: 'jump FinaleChoice',
          Text: 'Trust Mara and let her guide you backstage',
        },
      },
    },
  ],
  EndingRouter: [
    {
      Conditional: {
        Condition: (): StoryLabel => resolveEndingBranch(getStorage()),
        ReconciliationEnding: 'jump ReconciliationEnding',
        SecretEnding: 'jump SecretEnding',
        SoloEnding: 'jump SoloEnding',
      },
    },
  ],
  FinaleChoice: [
    'show scene backstage with fadeIn',
    'mara:smile One final choice, then the house lights go black.',
    {
      Choice: {
        Dialog:
          'centered The velvet curtain parts just enough to reveal what you earned.',
        followInvitation: {
          ...ACCEPTED_MASK,
          Condition: (): boolean => canRevealInvitationPath(getStorage()),
          Do: 'jump EndingRouter',
          Text: 'Follow the silver invitation onto the hidden stage',
        },
        guidedEntrance: {
          ...ACCEPTED_MASK,
          Clickable: (): boolean => canChooseTrustedGuide(getStorage()),
          Do: 'jump EndingRouter',
          Text: 'Take Mara’s hand and step through the marked doorway',
        },
        holdYourGround: {
          ...REJECTED_MASK,
          Do: 'jump EndingRouter',
          Text: 'Stay in the wings and face the audience on your own terms',
        },
      },
    },
  ],
  IllusionistRoute: [
    'show scene foyer with fadeIn',
    'show character revel smile at center with fadeIn',
    'revel:smile Then the troupe gets a performer. Sell the audience a miracle before they can doubt it.',
    {
      Choice: {
        Dialog:
          'revel:concerned One prop table glints with a silver invitation tucked beneath a deck of cards.',
        pocketInvitation: {
          ...FOUND_INVITATION,
          Do: 'jump BackstageNegotiation',
          Text: 'Pocket the silver invitation before anyone notices',
        },
        stayInCharacter: {
          Do: 'jump BackstageNegotiation',
          Text: 'Ignore it and rehearse your entrance instead',
        },
      },
    },
  ],
  InvestigatorRoute: [
    'show scene archives with fadeIn',
    'show character mara steady at center with fadeIn',
    'mara:steady Every ledger in this room has two stories. The real one is hidden between the lines.',
    {
      Choice: {
        collectProof: {
          ...FOUND_INVITATION,
          Do: 'jump BackstageNegotiation',
          Text: 'Collect the invitation as proof that the troupe is hiding something',
        },
        Dialog:
          'mara:steady A pressed silver invitation slips from a cracked folio when you open the oldest casebook.',
        leaveNoTrace: {
          Do: 'jump BackstageNegotiation',
          Text: 'Leave the folio untouched and question the cast directly',
        },
      },
    },
  ],
  ReconciliationEnding: [
    'show scene backstage with fadeIn',
    'show character mara smile at center with fadeIn',
    'mara:smile The secret stays with the troupe, but it no longer belongs to fear.',
    'centered You leave the theatre as its newest conspirator, trusted with the truth behind the velvet curtain.',
  ],
  SecretEnding: [
    'show scene secretStage with fadeIn',
    'show character revel smile at center with fadeIn',
    'revel:smile The hidden stage only opens for those who chase the truth harder than applause.',
    'centered Beneath the final spotlight, you inherit the theatre’s oldest illusion and the invitation to protect it.',
  ],
  SoloEnding: [
    'show scene foyer with fadeIn',
    'show character revel concerned at center with fadeIn',
    'revel:concerned You kept your footing, but some curtains only open for the people willing to trust.',
    'centered The crowd cheers the performance, unaware that the deepest mystery closed just before you arrived.',
  ],
  Start: [
    'show scene foyer with fadeIn',
    'show character revel smile at center with fadeIn',
    'revel:smile Welcome to the House of Veils, where every standing ovation hides a confession.',
    'centered Tonight you choose whether to protect the illusion or tear it open.',
    {
      Choice: {
        becomeIllusionist: {
          ...ILLUSIONIST_ROLE,
          Do: 'jump IllusionistRoute',
          Text: 'Step into the spotlight as the illusionist',
        },
        becomeInvestigator: {
          ...INVESTIGATOR_ROLE,
          Do: 'jump InvestigatorRoute',
          Text: 'Slip backstage as the investigator',
        },
        Dialog: 'revel:smile Who are you when the curtain rises?',
      },
    },
  ],
} as const;
