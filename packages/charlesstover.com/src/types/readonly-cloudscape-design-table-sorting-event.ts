import type { NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import type { TableProps } from '@cloudscape-design/components/table';

type ReadonlyCloudscapeTableSortingEvent<T> = Readonly<
  NonCancelableCustomEvent<
    Readonly<
      Omit<TableProps.SortingState<T>, 'sortingColumn'> & {
        readonly sortingColumn: Readonly<TableProps.SortingColumn<T>>;
      }
    >
  >
>;

export type { ReadonlyCloudscapeTableSortingEvent as default };
