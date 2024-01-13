import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import round from '../../../../utils/round.js';
import Bytes from '../bytes.js';
import Mebibytes from '../mebibytes.js';

interface Props {
  readonly children: number;
  readonly decimals?: number | undefined;
}

const BYTES_PER_KIBIBYTE = 1024;
const KIBIBYTES_PER_MEBIBYTE = 1024;
const SINGLE = 1;

export default function Kibibytes({ children, decimals }: Props): ReactElement {
  if (children < SINGLE) {
    return <Bytes decimals={decimals}>{children * BYTES_PER_KIBIBYTE}</Bytes>;
  }

  if (children >= KIBIBYTES_PER_MEBIBYTE) {
    return (
      <Mebibytes decimals={decimals}>
        {children / KIBIBYTES_PER_MEBIBYTE}
      </Mebibytes>
    );
  }

  if (typeof decimals === 'undefined') {
    return <I18n n={children.toLocaleString()}>$n KiB</I18n>;
  }

  return <I18n n={round(children, decimals).toLocaleString()}>$n KiB</I18n>;
}
