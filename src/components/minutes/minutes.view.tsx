import I18n from 'lazy-i18n';
import { ReactElement } from 'react';

interface Props {
  children: number;
}

export default function Minutes({ children }: Props): ReactElement {
  switch (children) {
    case 1:
      return <I18n>1 minute</I18n>;
    default:
      return <I18n n={children}>$n minutes</I18n>;
  }
}
