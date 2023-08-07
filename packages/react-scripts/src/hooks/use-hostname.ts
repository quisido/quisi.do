import { useContext } from 'react';
import Hostname from '../contexts/hostname';

export default function useHostname(): string {
  const hostname: string | null = useContext(Hostname);

  if (hostname === null) {
    throw new Error('Expected a hostname to be provided.');
  }

  return hostname;
}
