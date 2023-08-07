import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import round from '../../../../utils/round';
import Kibibytes from '../kibibytes';

interface Props {
  readonly children: number;
  readonly decimals?: number | undefined;
}

const BYTES_PER_KIBIBYTE = 1024;

export default function Bytes({
  children,
  decimals,
}: Readonly<Props>): ReactElement {
  if (children > BYTES_PER_KIBIBYTE) {
    return (
      <Kibibytes decimals={decimals}>{children / BYTES_PER_KIBIBYTE}</Kibibytes>
    );
  }

  if (typeof decimals === 'undefined') {
    return <I18n bytes={children.toLocaleString()}>$n bytes</I18n>;
  }

  return (
    <I18n bytes={round(children, decimals).toLocaleString()}>$n bytes</I18n>
  );
}
