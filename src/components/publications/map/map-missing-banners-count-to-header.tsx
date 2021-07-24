import I18n from 'lazy-i18n';
import type { ReactNode } from 'react';

const SINGLE = 1;

export default function mapMissingBannersCountToHeader(
  count: number,
): ReactNode {
  if (count === SINGLE) {
    return <I18n>Missing banner</I18n>;
  }
  return <I18n>Missing banners</I18n>;
}
