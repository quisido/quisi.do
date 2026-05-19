import { useContext } from 'react';
import WindowContext from '../contexts/window.js';

export default function useWindow(): Window | null {
  return useContext(WindowContext);
}
