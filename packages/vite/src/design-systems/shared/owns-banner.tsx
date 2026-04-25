import {
  type PropsWithChildren,
  type ReactElement,
  useMemo,
  useState,
} from 'react';
import { type OwnedBanner, OwnedBannerContext } from './owned-banner.js';

const useOwnsBanner = (): OwnedBanner => {
  const [ownedBannerId, setOwnedBannerId] = useState<string | null>(null);

  return useMemo(
    (): OwnedBanner => ({
      id: ownedBannerId,
      remove: (): void => {
        setOwnedBannerId(null);
      },
      set: (id: string): void => {
        setOwnedBannerId(id);
      },
    }),
    [ownedBannerId],
  );
};

export default function OwnsBanner({
  children,
}: PropsWithChildren): ReactElement {
  const ownedBanner: OwnedBanner = useOwnsBanner();

  return (
    <OwnedBannerContext.Provider value={ownedBanner}>
      {children}
    </OwnedBannerContext.Provider>
  );
}
