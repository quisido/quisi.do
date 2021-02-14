import I18n from 'lazy-i18n';
import { ReactNode } from 'react';

export default function mapDevArticlesCountToHeader(count: number): ReactNode {
  if (count === 1) {
    return <I18n>Dev.to article</I18n>;
  }
  return <I18n>Dev.to articles</I18n>;
}
