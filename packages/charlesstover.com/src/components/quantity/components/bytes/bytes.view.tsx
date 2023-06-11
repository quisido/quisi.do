import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import round from '../../../../utils/round';
import Kilobytes from '../kilobytes';

interface Props {
  readonly children: number;
  readonly decimals?: number | undefined;
}

const BYTES_PER_KILOBYTE = 1024;

export default function Bytes({
  children,
  decimals,
}: Readonly<Props>): ReactElement {
  if (children > BYTES_PER_KILOBYTE) {
    return (
      <Kilobytes decimals={decimals}>{children / BYTES_PER_KILOBYTE}</Kilobytes>
    );
  }

  if (typeof decimals === 'undefined') {
    return <I18n bytes={children}>$bytes bytes</I18n>;
  }

  return <I18n bytes={round(children, decimals)}>$bytes bytes</I18n>;
}
