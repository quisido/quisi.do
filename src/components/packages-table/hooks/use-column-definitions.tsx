import { TableProps } from '@awsui/components-react/table';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { ReactElement } from 'react';
import { useMemo } from 'react';
import ExplicitDownloads from '../components/explicit-downloads.view';
import PackageName from '../components/package-name';
import TotalDownloads from '../components/total-downloads.view';
import Item from '../types/item';

interface Props {
  filteringText: string;
}

export default function useColumnDefinitions({
  filteringText,
}: Props): TableProps.ColumnDefinition<Item>[] {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): TableProps.ColumnDefinition<Item>[] => [
      {
        header: translate('Package name') || '...',
        id: 'packageName',
        minWidth: 240,
        sortingField: 'packageName',
        width: 320,
        cell(item: Item): ReactElement {
          return <PackageName {...item} filteringText={filteringText} />;
        },
      },
      {
        header: translate('Total downloads') || '...',
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
        header: translate('Explicit downloads') || '...',
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
