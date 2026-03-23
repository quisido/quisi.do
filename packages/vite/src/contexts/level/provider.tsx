import type { PropsWithChildren, ReactElement } from 'react';
import { LevelContext } from './context.js';
import useLevel from './use-level.js';

export default function LevelProvider({
  children,
}: PropsWithChildren): ReactElement {
  const level: number = useLevel();

  return (
    <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>
  );
}
