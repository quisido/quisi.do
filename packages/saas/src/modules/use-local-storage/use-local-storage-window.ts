import { useContext } from 'react';
import { LocalStorageWindowContext } from './local-storage-window-context.js';

export default function useLocalStorageWindow(): Window | null {
  return useContext(LocalStorageWindowContext);
}
