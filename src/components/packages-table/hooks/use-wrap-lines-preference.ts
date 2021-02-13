import { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

export default function useWrapLinesPreference(): CollectionPreferencesProps.WrapLinesPreference {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): CollectionPreferencesProps.WrapLinesPreference => ({
      description: translate('Select to wrap lines and see all text.') || '...',
      label: translate('Wrap lines') || '...',
    }),
    [translate],
  );
}
