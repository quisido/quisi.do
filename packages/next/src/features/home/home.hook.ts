'use client';

import { type TranslateFunction, useTranslate } from 'lazy-i18n';

interface State {
  avatarAlt: string;
}

export default function useHome(): State {
  const translate: TranslateFunction = useTranslate();

  return {
    avatarAlt: translate('Avatar') ?? 'Avatar',
  };
}
