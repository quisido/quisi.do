import { useContext } from 'react';
import Intercom from '../contexts/intercom';
import type IntercomFunction from '../types/intercom-function';

export default function useIntercom(): IntercomFunction {
  const intercom: IntercomFunction | null = useContext(Intercom);

  if (intercom === null) {
    throw new Error('Expected the Intercom context to be mounted.');
  }

  return intercom;
}
