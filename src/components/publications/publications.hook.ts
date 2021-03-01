import { AlertProps } from '@awsui/components-react/alert';
import { CardsProps } from '@awsui/components-react/cards';
import { FlashbarProps } from '@awsui/components-react/flashbar';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { SelectProps } from '@awsui/components-react/select';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useCallback, useMemo, useState } from 'react';
import ReactCapsule, { useCapsule } from 'react-capsule';
import { useQuery } from 'react-query';
import DevArticle from '../../types/dev-article';
import MediumArticle from '../../types/medium-article';
import CARD_DEFINITION from './constants/card-definition';
import Sort from './constants/sort';
import useItems from './hooks/use-items';
import useNotifications from './hooks/use-notifications';
import useSortOptions from './hooks/use-sort-options';
import mapSortToSortFunction from './map/map-sort-to-sort-function';
import Item from './types/item';
import filterItemsByMinimumViews from './utils/filter-items-by-minimum-views';

interface State {
  cardDefinition: CardsProps<Item>['cardDefinition'];
  dismissAriaLabel?: string;
  handleAlertDismiss: AlertProps['onDismiss'];
  handleSortChange: SelectProps['onChange'];
  isAlertVisible: boolean;
  items: CardsProps<Item>['items'];
  loading: CardsProps<Item>['loading'];
  loadingText?: string;
  notifications: FlashbarProps.MessageDefinition[];
  selectedSortOption: SelectProps.Option;
  sortOptions: SelectProps.Options;
  sortPlaceholder?: string;
}

const IS_ALERT_VISIBLE_CAPSULE: ReactCapsule<boolean> = new ReactCapsule<boolean>(
  true,
);

export default function usePublications(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  const [isAlertVisible, setIsAlertVisible] = useCapsule(
    IS_ALERT_VISIBLE_CAPSULE,
  );

  const {
    data: mediumData,
    // error: mediumError,
    isLoading: isMediumLoading,
    // refetch: refetchMedium,
  } = useQuery(
    'medium',
    async (): Promise<Record<string, MediumArticle>> => {
      const response: Response = await fetch(
        process.env.REACT_APP_MEDIUM_STATS ||
          'https://medium.cscdn.net/charles-stover.json',
      );
      return await response.json();
    },
  );

  const {
    data: devData,
    // error: devError,
    isLoading: isDevLoading,
    // refetch: refetchDev,
  } = useQuery(
    'dev',
    async (): Promise<DevArticle[]> => {
      const response: Response = await fetch(
        'https://dev.to/api/articles?username=charlesstover',
      );
      return await response.json();
    },
  );

  // States
  const sortOptions: SelectProps.Options = useSortOptions();
  const [sort, setSort] = useState(Sort.ViewsPerDay);

  const items: Item[] = useItems({
    devData,
    mediumData,
  });

  return {
    cardDefinition: CARD_DEFINITION,
    dismissAriaLabel: translate('Dimiss'),
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
        const newSort: Sort = e.detail.selectedOption.value as Sort;
        setSort(newSort);
      },
      [],
    ),

    items: useMemo((): Item[] => {
      const newItems: Item[] = [...items];
      newItems.sort(mapSortToSortFunction(sort));
      return newItems.filter(filterItemsByMinimumViews);
    }, [items, sort]),

    notifications: useNotifications({
      items,
    }),

    selectedSortOption: useMemo((): SelectProps.Option => {
      const findSelectedSortOption = ({ value }: SelectProps.Option): boolean =>
        value === sort;
      // Since `sort` is a Sort enum value and all Sort enum values have a sort
      //   option, we can assert that we found this sort option.
      return sortOptions.find(findSelectedSortOption) as SelectProps.Option;
    }, [sort, sortOptions]),
  };
}
