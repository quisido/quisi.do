import type { ReactNode } from 'react';
import type { WithLabel } from './with-label.js';

interface HeadingProps {
  readonly heading: Exclude<ReactNode, boolean | null | undefined>;
  readonly label?: undefined;
  readonly labelledBy?: undefined;
}

interface NoHeadingProps {
  readonly heading?: undefined;
}

export type HeadingOrLabel<T> = T & (HeadingProps | WithLabel<NoHeadingProps>);
