import { useContext } from 'react';
import Intercom from '../contexts/intercom.js';
import type IntercomFunction from '../types/intercom-function.js';

export default function useIntercom(): IntercomFunction {
  const intercom: IntercomFunction | null = useContext(Intercom);

  if (intercom === null) {
    throw new Error('Expected the Intercom context to be mounted.');
  }

  return intercom;
}
