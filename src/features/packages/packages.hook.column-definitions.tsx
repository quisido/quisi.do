import type { TableProps } from '@awsui/components-react/table';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import type Item from './packages.type.item';
import ExplicitDownloads from './packages.view.explicit-downloads-cell';
import PackageName from './packages.view.name-cell';
import TotalDownloads from './packages.view.total-downloads-cell';

interface Props {
  readonly filteringText: string;
}

export default function usePackagesColumnDefinitions({
  filteringText,
}: Props): readonly TableProps.ColumnDefinition<Item>[] {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): TableProps.ColumnDefinition<Item>[] => [
      {
        header: translate('Package name') ?? '...',
        id: 'packageName',
        minWidth: 240,
        sortingField: 'packageName',
        width: 320,
        cell(item: Item): ReactElement {
          return <PackageName {...item} filteringText={filteringText} />;
        },
      },

      {
        header: translate('Total downloads') ?? '...',
        id: 'totalDownloads',
        maxWidth: 240,
        minWidth: 180,
        sortingField: 'totalDownloads',
        width: 240,
        cell(item: Item): ReactElement {
          return <TotalDownloads {...item} />;
        },
      },

      {
        header: translate('Explicit downloads') ?? '...',
        id: 'explicitDownloads',
        maxWidth: 240,
        minWidth: 180,
        sortingField: 'explicitDownloads',
        width: 240,
        cell(item: Item): ReactElement {
          return <ExplicitDownloads {...item} />;
        },
      },
    ],
    [filteringText, translate],
  );
}
