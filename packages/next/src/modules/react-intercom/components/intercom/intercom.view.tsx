import { type ReactElement, type ReactNode } from 'react';
import IntercomContext from '../../contexts/intercom.js';
import type IntercomFunction from '../../types/intercom-function.js';
import useIntercom from './intercom.hook.js';

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
