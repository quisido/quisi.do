import { useContext } from 'react';
import { LevelContext } from './context.js';

export default function useLevel(): number {
  return useContext(LevelContext);
}
