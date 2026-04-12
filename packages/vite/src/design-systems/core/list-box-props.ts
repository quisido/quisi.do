import type { PropsWithChildren } from 'react';
import type { LabelProps } from './label-props.js';
import type KeyProps from './key-props.js';

export type ListBoxProps = LabelProps & Props;

interface Props {
  readonly options: readonly ListBoxOption[];
  /**
   * @default 'vertical'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
}

export type ListBoxOption = KeyProps & PropsWithChildren;
