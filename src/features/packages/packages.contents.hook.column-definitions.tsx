import type { TableProps } from '@awsui/components-react/table';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import DirectDownloads from './packages.direct-downloads-cell.view';
import PackageName from './packages.name-cell.view';
import TotalDownloads from './packages.total-downloads-cell.view';
import type Item from './types/packages-item';

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
        header: translate('Direct downloads') ?? '...',
        id: 'directDownloads',
        maxWidth: 240,
        minWidth: 180,
        sortingField: 'directDownloads',
        width: 240,
        cell(item: Item): ReactElement {
          return <DirectDownloads {...item} />;
        },
      },
    ],
    [filteringText, translate],
  );
}
