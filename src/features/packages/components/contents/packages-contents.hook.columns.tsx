import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import type TableColumn from '../../../../types/table-column';
import DirectDownloads from '../../components/direct-downloads-cell';
import PackageName from '../../components/name-cell';
import TotalDownloads from '../../components/total-downloads-cell';
import type Item from '../../types/packages-item';

export default function usePackageContentsColumns(
  filter: string,
): readonly TableColumn<Item>[] {
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): readonly TableColumn<Item>[] => [
      {
        header: translate('Package name') ?? '...',
        minWidth: 240,
        width: 320,
        Cell(item: Readonly<Item>): ReactElement {
          return <PackageName {...item} filter={filter} />;
        },
        sort(a: Item, b: Item): number {
          return a.packageName.localeCompare(b.packageName);
        },
      },

      {
        header: translate('Total downloads') ?? '...',
        maxWidth: 240,
        minWidth: 180,
        width: 240,
        Cell(item: Item): ReactElement {
          return <TotalDownloads {...item} />;
        },
        sort(a: Item, b: Item): number {
          return a.totalDownloads - b.totalDownloads;
        },
      },

      {
        header: translate('Direct downloads') ?? '...',
        maxWidth: 240,
        minWidth: 180,
        width: 240,
        Cell(item: Item): ReactElement {
          return <DirectDownloads {...item} />;
        },
        sort(a: Item, b: Item): number {
          return a.directDownloads - b.directDownloads;
        },
      },
    ],
    [filter, translate],
  );
}
