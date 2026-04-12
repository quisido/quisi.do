import { useContext, useLayoutEffect } from 'react';
import { type OwnedMain, OwnedMainContext } from './owned-main.js';

export default function useMainOwner(mainId: string): void {
  const ownedMain: OwnedMain | null = useContext(OwnedMainContext);

  if (ownedMain === null) {
    throw new Error(
      'A main landmark must be owned by an application or a document.',
    );
  }

  const {
    id: ownedMainId,
    remove: removeOwnedMain,
    set: setOwnedMain,
  } = ownedMain;

  useLayoutEffect((): VoidFunction => {
    // If the main landmark owner already owns another main landmark,
    if (ownedMainId !== null && ownedMainId !== mainId) {
      throw new Error(
        'An application or document cannot own multiple main landmarks.',
        { cause: ownedMainId },
      );
    }

    setOwnedMain(mainId);
    return (): void => {
      removeOwnedMain();
    };
  }, [mainId, ownedMainId, removeOwnedMain, setOwnedMain]);
}
