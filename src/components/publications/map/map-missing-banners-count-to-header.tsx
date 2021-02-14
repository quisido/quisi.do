import I18n from 'lazy-i18n';
import { ReactNode } from 'react';

export default function mapMissingBannersCountToHeader(
  count: number,
): ReactNode {
  if (count === 1) {
    return <I18n>Missing banner</I18n>;
  }
  return <I18n>Missing banners</I18n>;
}
