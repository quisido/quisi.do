import { TableProps } from '@awsui/components-react/table';
import { ReactElement } from 'react';
import PackageName from '../components/package-name';
import TotalDownloads from '../components/total-downloads.view';
// import UniqueDownloads from '../components/unique-downloads.view';
import Item from '../types/item';

const DEFAULT_COLUMN_DEFINITIONS: TableProps.ColumnDefinition<Item>[] = [
  {
    cell(item: Item): ReactElement {
      return <PackageName {...item} />;
    },
    header: 'Package name',
    id: 'packageName',
    minWidth: 240,
    sortingField: 'packageName',
  },
  {
    cell(item: Item): ReactElement {
      return <TotalDownloads {...item} />;
    },
    header: 'Total downloads',
    id: 'totalDownloads',
    maxWidth: 240,
    minWidth: 180,
    sortingField: 'totalDownloads',
  },
  /*
  {
    cell(item: Item): ReactElement {
      return <UniqueDownloads {...item} />;
    },
    header: 'Unique downloads',
    id: 'uniqueDownloads',
    maxWidth: 240,
    minWidth: 180,
    sortingField: 'uniqueDownloads',
  },
  */
];

export default DEFAULT_COLUMN_DEFINITIONS;
