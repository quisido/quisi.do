import type { ReactElement, ReactNode } from 'react';
import IntercomContext from '../../contexts/intercom';
import type IntercomFunction from '../../types/intercom-function';
import useIntercom from './intercom.root.hook';

interface Props {
  readonly appId: string;
  readonly children: ReactNode;
}

export default function Intercom({ appId, children }: Props): ReactElement {
  const intercom: IntercomFunction = useIntercom(appId);

  return (
    <IntercomContext.Provider value={intercom}>
      {children}
    </IntercomContext.Provider>
  );
}
