import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import round from '../../../../utils/round';
import Kibibytes from '../kibibytes';

interface Props {
  readonly children: number;
  readonly decimals?: number | undefined;
}

const KIBIBYTE_PER_MEBIBYTE = 1024;
const SINGLE = 1;

export default function Mebibytes({ children, decimals }: Props): ReactElement {
  if (children < SINGLE) {
    return (
      <Kibibytes decimals={decimals}>
        {children * KIBIBYTE_PER_MEBIBYTE}
      </Kibibytes>
    );
  }

  if (typeof decimals === 'undefined') {
    return <I18n n={children.toLocaleString()}>$n MiB</I18n>;
  }

  return <I18n n={round(children, decimals).toLocaleString()}>$n MiB</I18n>;
}
