import type { CollectionPreferencesProps } from '@awsui/components-react/collection-preferences';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

export default function useVisibleContentPreference(): CollectionPreferencesProps.VisibleContentPreference {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): CollectionPreferencesProps.VisibleContentPreference => ({
      title: translate('Select visible columns.') ?? '...',
      options: [
        {
          label: translate('Package properties') ?? '...',
          options: [
            {
              id: 'packageName',
              label: translate('Package name') ?? '...',
            },
            {
              id: 'totalDownloads',
              label: translate('Total downloads') ?? '...',
            },
            {
              id: 'explicitDownloads',
              label: translate('Explicit downloads') ?? '...',
            },
          ],
        },
      ],
    }),
    [translate],
  );
}
