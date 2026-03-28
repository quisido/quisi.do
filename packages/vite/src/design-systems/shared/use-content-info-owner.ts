import { useContext, useLayoutEffect } from 'react';
import {
  type OwnedContentInfo,
  OwnedContentInfoContext,
} from './owned-content-info.js';

export default function useContentInfoOwner(contentInfoId: string): void {
  const ownedContentInfo: OwnedContentInfo | null = useContext(
    OwnedContentInfoContext,
  );

  if (ownedContentInfo === null) {
    throw new Error(
      'Content info must be owned by an application or a document.',
    );
  }

  const {
    id: ownedContentInfoId,
    remove: removeOwnedContentInfo,
    set: setOwnedContentInfo,
  } = ownedContentInfo;

  useLayoutEffect((): VoidFunction => {
    // If the content info owner already owns other content info,
    if (ownedContentInfoId !== null && ownedContentInfoId !== contentInfoId) {
      throw new Error(
        'An application or document cannot own multiple content info.',
        { cause: ownedContentInfoId },
      );
    }

    setOwnedContentInfo(contentInfoId);
    return (): void => {
      removeOwnedContentInfo();
    };
  }, [
    contentInfoId,
    ownedContentInfoId,
    removeOwnedContentInfo,
    setOwnedContentInfo,
  ]);
}
