import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { TableProps } from '@awsui/components-react/table';
import { TextFilterProps } from '@awsui/components-react/text-filter';
import {
  ComponentType,
  MutableRefObject,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import useFilter from './hooks/use-filter';
import useTableHighlight from './hooks/use-table-highlight';
import useTableItemDescription from './hooks/use-table-item-description';
import useTableItemDescriptionHighlight from './hooks/use-table-item-description-highlight';
import defaultCountText from './utils/default-count-text';

type CountText = (count: number) => TextFilterProps['countText'];

interface Props<Item> {
  DescriptionComponent?: ComponentType<Item>;
  countText?: CountText | TextFilterProps['countText'];
  defaultColumnDefinitions?: TableProps.ColumnDefinition<Item>[];
  defaultFilteringText?: TextFilterProps['filteringText'];
  defaultItems?: Item[];
  defaultRowClickDetails?: TableProps.OnRowClickDetail<Item>[];
  defaultSortingColumn?: TableProps['sortingColumn'];
  defaultSortingDescending?: TableProps['sortingDescending'];
  filteringAriaLabel?: TextFilterProps['filteringAriaLabel'];
  filteringFunction?(item: Item, filteringText: string): boolean;
  filteringPlaceholder?: TextFilterProps['filteringPlaceholder'];
  filteringTextProp?: boolean;
}

interface State<Item> {
  columnDefinitions: TableProps.ColumnDefinition<Item>[];
  filter: TableProps['filter'];
  handleColumnWidthsChange: Required<TableProps>['onColumnWidthsChange'];
  handleRowClick: Required<TableProps>['onRowClick'];
  handleSortingChange: Required<TableProps>['onSortingChange'];
  items: Item[];
  ref: MutableRefObject<HTMLDivElement | null>;
  sortingColumn?: TableProps.SortingColumn<Item>;
  sortingDescending?: TableProps['sortingDescending'];
}

const DEFAULT_DEFAULT_ROW_CLICK_DETAILS: readonly unknown[] = Object.freeze([]);
const DEFAULT_FILTERING_TEXT_PROPS = false;
const DEFAULT_ITEMS: readonly unknown[] = Object.freeze([]);
const DEFAULT_PROPS: Props<unknown> = Object.freeze(Object.create(null));

export default function useTable<Item>(
  props: Props<Item> = DEFAULT_PROPS as Props<Item>,
): State<Item> {
  const {
    DescriptionComponent,
    countText: propsCountText,
    defaultColumnDefinitions,
    defaultFilteringText = '',
    defaultItems = DEFAULT_ITEMS as Item[],
    defaultRowClickDetails = DEFAULT_DEFAULT_ROW_CLICK_DETAILS as TableProps.OnRowClickDetail<Item>[],
    defaultSortingColumn,
    defaultSortingDescending,
    filteringAriaLabel = 'Filter',
    filteringFunction,
    filteringPlaceholder = 'Filter',
    filteringTextProp = DEFAULT_FILTERING_TEXT_PROPS,
  } = props;

  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const [filteringText, setFilteringText] = useState(defaultFilteringText);
  const [sortingColumn, setSortingColumn] = useState(defaultSortingColumn);
  const [sortingDescending, setSortingDescending] = useState(
    defaultSortingDescending,
  );
  const [widths, setWidths] = useState<readonly number[]>([]);

  const {
    handleRowClick,
    rowClickDetails,
    setRowClickDetails,
  } = useTableHighlight<Item>({
    defaultRowClickDetails,
    ref,
  });

  const isFilteringTextEmpty: boolean = filteringText === '';

  const filterItemsByText = useCallback(
    (item: Item): boolean => {
      if (typeof filteringFunction === 'function') {
        return filteringFunction(item, filteringText);
      }
      for (const value of Object.values(item)) {
        if (`${value}`.indexOf(filteringText) > -1) {
          return true;
        }
      }
      return false;
    },
    [filteringFunction, filteringText],
  );

  const filteredItems: Item[] = useMemo((): Item[] => {
    if (isFilteringTextEmpty) {
      return defaultItems;
    }
    return defaultItems.filter(filterItemsByText);
  }, [defaultItems, filterItemsByText, isFilteringTextEmpty]);

  const countText: TextFilterProps['countText'] = useMemo((): TextFilterProps['countText'] => {
    if (typeof propsCountText === 'undefined') {
      if (isFilteringTextEmpty) {
        return;
      }
      return defaultCountText(filteredItems.length);
    }
    if (typeof propsCountText !== 'function') {
      return propsCountText;
    }
    if (isFilteringTextEmpty) {
      return;
    }
    return propsCountText(filteredItems.length);
  }, [filteredItems, isFilteringTextEmpty, propsCountText]);

  const items: Item[] = useMemo((): Item[] => {
    if (typeof sortingColumn === 'undefined') {
      return filteredItems;
    }

    const sortingDirection: -1 | 1 = sortingDescending ? -1 : 1;
    const sortItems = (one: Item, two: Item): number => {
      if (typeof sortingColumn.sortingComparator === 'function') {
        return sortingColumn.sortingComparator(one, two);
      }
      const sortingField: keyof Item = sortingColumn.sortingField as keyof Item;
      if (one[sortingField] < two[sortingField]) {
        return -1 * sortingDirection;
      }
      if (one[sortingField] > two[sortingField]) {
        return sortingDirection;
      }
      return 0;
    };
    return filteredItems.sort(sortItems);
  }, [filteredItems, sortingColumn, sortingDescending]);

  const handleColumnWidthsChange = useCallback(
    (
      e: NonCancelableCustomEvent<TableProps.ColumnWidthsChangeDetail>,
    ): void => {
      setWidths(e.detail.widths);
    },
    [],
  );

  const handleFilterChange = useCallback(
    (e: NonCancelableCustomEvent<TextFilterProps.ChangeDetail>): void => {
      setFilteringText(e.detail.filteringText);
    },
    [],
  );

  const filter: TableProps['filter'] = useFilter({
    countText,
    filteringAriaLabel,
    filteringPlaceholder,
    filteringText,
    onChange: handleFilterChange,
  });

  const handleSortingChange = useCallback(
    (e: NonCancelableCustomEvent<TableProps.SortingState<Item>>): void => {
      setRowClickDetails([]);
      setSortingColumn(e.detail.sortingColumn);
      setSortingDescending(e.detail.isDescending);
    },
    [setRowClickDetails],
  );

  const mapDefaultColumnDefinitionsToColumnDefinitions = useCallback(
    (
      columnDefinition: TableProps.ColumnDefinition<Item>,
      index: number,
    ): TableProps.ColumnDefinition<Item> => {
      return {
        ...columnDefinition,
        cell: filteringTextProp
          ? (item: Item): ReactNode => {
              return columnDefinition.cell({ ...item, filteringText });
            }
          : columnDefinition.cell,
        width: widths[index],
      };
    },
    [filteringText, filteringTextProp, widths],
  );

  const columnDefinitions: TableProps.ColumnDefinition<Item>[] = useMemo((): TableProps.ColumnDefinition<Item>[] => {
    if (typeof defaultColumnDefinitions === 'undefined') {
      return [];
    }
    return defaultColumnDefinitions.map(
      mapDefaultColumnDefinitionsToColumnDefinitions,
    );
  }, [
    defaultColumnDefinitions,
    mapDefaultColumnDefinitionsToColumnDefinitions,
  ]);

  useTableItemDescription<Item>({
    Component: DescriptionComponent,
    onRowClick: handleRowClick,
    items,
    ref,
    rowClickDetails,
  });

  useTableItemDescriptionHighlight({
    enabled: typeof DescriptionComponent !== 'undefined',
    ref,
    rowClickDetails,
  });

  return {
    columnDefinitions,
    filter,
    handleColumnWidthsChange,
    handleRowClick,
    handleSortingChange,
    items,
    ref,
    sortingColumn,
    sortingDescending,
  };
}
