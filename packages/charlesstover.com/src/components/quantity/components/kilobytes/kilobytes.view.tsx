import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import round from '../../../../utils/round';
import Bytes from '../bytes';

interface Props {
  readonly children: number;
  readonly decimals?: number | undefined;
}

const BYTES_PER_KILOBYTE = 1024;
const SINGLE = 1;

export default function Kilobytes({
  children,
  decimals,
}: Readonly<Props>): ReactElement {
  if (children < SINGLE) {
    return <Bytes decimals={decimals}>{children * BYTES_PER_KILOBYTE}</Bytes>;
  }

  if (typeof decimals === 'undefined') {
    return <I18n kilobytes={children}>$kilobytes kB</I18n>;
  }

  return <I18n kilobytes={round(children, decimals)}>$kilobytes kB</I18n>;
}
