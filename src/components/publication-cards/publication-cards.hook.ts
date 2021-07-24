import type { AlertProps } from '@awsui/components-react/alert';
import type { CardsProps } from '@awsui/components-react/cards';
import type { SelectProps } from '@awsui/components-react/select';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useCallback, useMemo, useState } from 'react';
import ReactCapsule, { useCapsule } from 'react-capsule';
import useDevStats from '../../hooks/use-dev-stats';
import useMediumStats from '../../hooks/use-medium-stats';
import type ReadonlySelectChangeEvent from '../../types/readonly-select-change-event';
import Sort from './publication-cards.constant.sort';
import filterItemsByMinimumViews from './publication-cards.filter.items-by-minimum-views';
import useItems from './publication-cards.hook.items';
import useSortOptions from './publication-cards.hook.sort-options';
import mapSortToFunction from './publication-cards.map.sort-to-function';
import type Item from './publication-cards.type.item';

interface State {
  dismissAriaLabel?: string;
  handleAlertDismiss: AlertProps['onDismiss'];
  handleSortChange: SelectProps['onChange'];
  isAlertVisible: boolean;
  items: CardsProps<Item>['items'];
  loading: CardsProps<Item>['loading'];
  loadingText?: string;
  selectedSortOption: SelectProps.Option;
  sortOptions: SelectProps.Options;
  sortPlaceholder?: string;
}

const IS_ALERT_VISIBLE_CAPSULE: ReactCapsule<boolean> =
  new ReactCapsule<boolean>(true);

export default function usePublicationCards(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  const [isAlertVisible, setIsAlertVisible] = useCapsule(
    IS_ALERT_VISIBLE_CAPSULE,
  );

  const {
    data: devData,
    // error: devError,
    isLoading: isDevLoading,
    // refetch: refetchDev,
  } = useDevStats();

  const {
    data: mediumData,
    // error: mediumError,
    isLoading: isMediumLoading,
    // refetch: refetchMedium,
  } = useMediumStats();

  // States
  const sortOptions: SelectProps.Options = useSortOptions();
  const [sort, setSort] = useState(Sort.ViewsPerDay);

  const items: readonly Item[] = useItems({
    devData,
    mediumData,
  });

  return {
    dismissAriaLabel: translate('Dismiss'),
    isAlertVisible,
    loading: isDevLoading || isMediumLoading,
    loadingText: translate('Loading publications'),
    sortOptions,
    sortPlaceholder: translate('Sort by'),

    handleAlertDismiss: useCallback((): void => {
      setIsAlertVisible(false);
    }, [setIsAlertVisible]),

    handleSortChange: useCallback((e: ReadonlySelectChangeEvent): void => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const newSort: Sort = e.detail.selectedOption.value as Sort;
      setSort(newSort);
    }, []),

    items: useMemo((): readonly Item[] => {
      const newItems: Item[] = [...items];
      newItems.sort(mapSortToFunction(sort));
      return newItems.filter(filterItemsByMinimumViews);
    }, [items, sort]),

    selectedSortOption: useMemo((): SelectProps.Option => {
      const findSelectedSortOption = ({
        value,
      }: Readonly<SelectProps.Option>): boolean => value === sort;
      // Since `sort` is a Sort enum value and all Sort enum values have a sort
      //   option, we can assert that we found this sort option.
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return sortOptions.find(findSelectedSortOption) as SelectProps.Option;
    }, [sort, sortOptions]),
  };
}
