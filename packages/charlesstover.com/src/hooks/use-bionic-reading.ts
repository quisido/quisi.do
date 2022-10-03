import { useContext } from 'react';
import BionicReadingContext from '../contexts/bionic-reading';

export default function useBionicReading(): boolean {
  return useContext(BionicReadingContext);
}
