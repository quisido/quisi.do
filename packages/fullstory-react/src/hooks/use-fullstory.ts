import type { FSApi } from '@fullstory/snippet';
import { useContext } from 'react';
import Fullstory from '../contexts/fullstory.js';

export default function useFullstory(): FSApi {
  // Contexts
  const fullstory: FSApi | null = useContext(Fullstory);

  if (fullstory === null) {
    throw new Error('Expected the Fullstory context to be provided.');
  }

  return fullstory;
}
