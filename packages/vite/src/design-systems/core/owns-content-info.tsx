import {
  type PropsWithChildren,
  type ReactElement,
  useMemo,
  useState,
} from 'react';
import {
  type OwnedContentInfo,
  OwnedContentInfoContext,
} from './owned-content-info.js';

const useOwnsContentInfo = (): OwnedContentInfo => {
  const [ownedContentInfoId, setOwnedContentInfoId] = useState<string | null>(
    null,
  );

  return useMemo(
    (): OwnedContentInfo => ({
      id: ownedContentInfoId,
      remove: (): void => {
        setOwnedContentInfoId(null);
      },
      set: (id: string): void => {
        setOwnedContentInfoId(id);
      },
    }),
    [ownedContentInfoId],
  );
};

export default function OwnsContentInfo({
  children,
}: PropsWithChildren): ReactElement {
  const ownedContentInfo: OwnedContentInfo = useOwnsContentInfo();

  return (
    <OwnedContentInfoContext.Provider value={ownedContentInfo}>
      {children}
    </OwnedContentInfoContext.Provider>
  );
}
