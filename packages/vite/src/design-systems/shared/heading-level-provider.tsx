import type { PropsWithChildren, ReactElement } from 'react';
import { HeadingLevelContext } from './heading-level-context.js';
import useHeadingLevel from './use-heading-level.js';

export default function HeadingLevelProvider({
  children,
}: PropsWithChildren): ReactElement {
  const level: number = useHeadingLevel();

  return (
    <HeadingLevelContext.Provider value={level + 1}>
      {children}
    </HeadingLevelContext.Provider>
  );
}
