/* eslint-disable @typescript-eslint/no-type-alias */
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TableProps } from '@awsui/components-react/table';

type ReadonlyTableSortingEvent<T> = Readonly<
  NonCancelableCustomEvent<
    Readonly<
      Omit<TableProps.SortingState<T>, 'sortingColumn'> & {
        readonly sortingColumn: Readonly<TableProps.SortingColumn<T>>;
      }
    >
  >
>;

export default ReadonlyTableSortingEvent;
