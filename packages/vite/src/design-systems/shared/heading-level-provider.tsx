import type { ReactElement, ReactNode } from 'react';
import { HeadingLevelContext } from './heading-level-context.js';
import useHeadingLevel from './use-heading-level.js';

interface Props {
  readonly children: ReactNode;
  readonly increment: boolean;
}

const useHeadingLevelProvider = (increment: boolean): number => {
  const value: number = useHeadingLevel();

  if (increment) {
    return value + 1;
  }

  return value;
};

export default function HeadingLevelProvider({
  children,
  increment,
}: Props): ReactElement {
  const value: number = useHeadingLevelProvider(increment);

  return (
    <HeadingLevelContext.Provider value={value}>
      {children}
    </HeadingLevelContext.Provider>
  );
}
