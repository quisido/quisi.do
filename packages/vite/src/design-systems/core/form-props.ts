import type { ReactNode } from 'react';
import type { OneOf } from './one-of.js';

interface OneOfProps {
  readonly heading: Exclude<ReactNode, boolean | null | undefined>;
  readonly labelledBy: string;
}

interface Props {
  readonly children: ReactNode;
  readonly onSubmit: () => void;
}

export type FormProps = OneOf<OneOfProps> & Props;
