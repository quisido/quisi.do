import type { Dispatch, SetStateAction } from 'react';
import { useCapsule } from 'react-capsule';
import DarkModeCapsule from '../capsules/dark-mode';

export default function useDarkMode(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  return useCapsule(DarkModeCapsule);
}
