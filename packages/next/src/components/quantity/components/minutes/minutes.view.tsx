import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';

interface Props {
  readonly children: number;
}

const SINGLE = 1;

export default function Minutes({ children }: Props): ReactElement {
  switch (children) {
    case SINGLE:
      return <I18n>1 minute</I18n>;
    default:
      return <I18n n={children.toLocaleString()}>$n minutes</I18n>;
  }
}
