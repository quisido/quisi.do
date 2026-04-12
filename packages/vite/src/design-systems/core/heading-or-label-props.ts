import type { ReactNode } from 'react';
import type { LabelProps } from './label-props.js';

export type HeadingOrLabelProps =
  | {
      readonly heading: Exclude<ReactNode, boolean | null | undefined>;
      readonly label?: undefined;
      readonly labelledBy?: undefined;
    }
  | (LabelProps & {
      readonly heading?: undefined;
    });
