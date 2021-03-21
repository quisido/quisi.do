import { AlertProps } from '@awsui/components-react/alert';
import { CardsProps } from '@awsui/components-react/cards';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { SelectProps } from '@awsui/components-react/select';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useCallback, useMemo, useState } from 'react';
import ReactCapsule, { useCapsule } from 'react-capsule';
import PublicationCardsSort from '../../constants/publication-cards-sort';
import filterPublicationCardItemsByMinimumViews from '../../filter/filter-publication-card-items-by-minimum-views';
import useDevStats from '../../hooks/use-dev-stats';
import useMediumStats from '../../hooks/use-medium-stats';
import mapPublicationCardsSortToFunction from '../../map/map-publication-cards-sort-to-function';
import PublicationCardItem from '../../types/publication-card-item';
import useItems from './publication-cards.hook.items';
import useSortOptions from './publication-cards.hook.sort-options';

interface State {
  dismissAriaLabel?: string;
  handleAlertDismiss: AlertProps['onDismiss'];
  handleSortChange: SelectProps['onChange'];
  isAlertVisible: boolean;
  items: CardsProps<PublicationCardItem>['items'];
  loading: CardsProps<PublicationCardItem>['loading'];
  loadingText?: string;
  selectedSortOption: SelectProps.Option;
  sortOptions: SelectProps.Options;
  sortPlaceholder?: string;
}

const IS_ALERT_VISIBLE_CAPSULE: ReactCapsule<boolean> = new ReactCapsule<boolean>(
  true,
);

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
  const [sort, setSort] = useState(PublicationCardsSort.ViewsPerDay);

  const items: PublicationCardItem[] = useItems({
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

    handleSortChange: useCallback(
      (e: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
        const newSort: PublicationCardsSort = e.detail.selectedOption
          .value as PublicationCardsSort;
        setSort(newSort);
      },
      [],
    ),

    items: useMemo((): PublicationCardItem[] => {
      const newItems: PublicationCardItem[] = [...items];
      newItems.sort(mapPublicationCardsSortToFunction(sort));
      return newItems.filter(filterPublicationCardItemsByMinimumViews);
    }, [items, sort]),

    selectedSortOption: useMemo((): SelectProps.Option => {
      const findSelectedSortOption = ({ value }: SelectProps.Option): boolean =>
        value === sort;
      // Since `sort` is a Sort enum value and all Sort enum values have a sort
      //   option, we can assert that we found this sort option.
      return sortOptions.find(findSelectedSortOption) as SelectProps.Option;
    }, [sort, sortOptions]),
  };
}
