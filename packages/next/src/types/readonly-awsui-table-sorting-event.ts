import { type NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import { type TableProps } from '@awsui/components-react/table';

type ReadonlyAwsuiTableSortingEvent<T> = Readonly<
  NonCancelableCustomEvent<
    Readonly<
      Omit<TableProps.SortingState<T>, 'sortingColumn'> & {
        readonly sortingColumn: Readonly<TableProps.SortingColumn<T>>;
      }
    >
  >
>;

export type { ReadonlyAwsuiTableSortingEvent as default };
