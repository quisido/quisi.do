import {
  type PropsWithChildren,
  type ReactElement,
  useMemo,
  useState,
} from 'react';
import { type OwnedMain, OwnedMainContext } from './owned-main.js';

const useOwnsMain = (): OwnedMain => {
  const [ownedMainId, setOwnedMainId] = useState<string | null>(null);

  return useMemo(
    (): OwnedMain => ({
      id: ownedMainId,
      remove: (): void => {
        setOwnedMainId(null);
      },
      set: (id: string): void => {
        setOwnedMainId(id);
      },
    }),
    [ownedMainId],
  );
};

export default function OwnsMain({
  children,
}: PropsWithChildren): ReactElement {
  const ownedMain: OwnedMain = useOwnsMain();

  return (
    <OwnedMainContext.Provider value={ownedMain}>
      {children}
    </OwnedMainContext.Provider>
  );
}
