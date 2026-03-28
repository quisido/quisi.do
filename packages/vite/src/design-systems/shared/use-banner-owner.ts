import { useContext, useLayoutEffect } from 'react';
import { type OwnedBanner, OwnedBannerContext } from './owned-banner.js';

export default function useBannerOwner(bannerId: string): void {
  const ownedBanner: OwnedBanner | null = useContext(OwnedBannerContext);

  if (ownedBanner === null) {
    throw new Error('A banner must be owned by an application or a document.');
  }

  const {
    id: ownedBannerId,
    remove: removeOwnedBanner,
    set: setOwnedBanner,
  } = ownedBanner;

  useLayoutEffect((): VoidFunction => {
    // If the banner owner already owns another banner,
    if (ownedBannerId !== null && ownedBannerId !== bannerId) {
      throw new Error(
        'An application or document cannot own multiple banners.',
        { cause: ownedBannerId },
      );
    }

    setOwnedBanner(bannerId);
    return (): void => {
      removeOwnedBanner();
    };
  }, [bannerId, ownedBannerId, removeOwnedBanner, setOwnedBanner]);
}
