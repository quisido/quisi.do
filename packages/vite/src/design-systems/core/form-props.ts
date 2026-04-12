import type { ReactNode } from 'react';
import type { HeadingOrLabelProps } from './heading-or-label-props.js';

interface Props {
  readonly children: ReactNode;
}

export type FormProps = HeadingOrLabelProps & Props;
