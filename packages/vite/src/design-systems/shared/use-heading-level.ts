import { useContext } from 'react';
import { HeadingLevelContext } from './heading-level-context.js';

export default function useHeadingLevel(): number {
  return useContext(HeadingLevelContext);
}
