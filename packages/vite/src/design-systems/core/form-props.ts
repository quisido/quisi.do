import type { ReactNode } from 'react';
import type { HeadingOrLabelProps } from './heading-or-label-props.js';

interface Props {
  readonly children: ReactNode;
  readonly onSubmit: () => void;
}

export type FormProps = HeadingOrLabelProps & Props;
