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
import Sort from './publications.constant.sort';
import filterItemsByMinimumViews from './publications.filter.items-by-minimum-views';
import useItems from './publications.hook.items';
import mapSortToFunction from './publications.map.sort-to-function';
import type Item from './publications.type.item';

interface State {
  readonly dismissAriaLabel?: string;
  readonly handleAlertDismiss: AlertProps['onDismiss'];
  readonly handleSortChange: SelectProps['onChange'];
  readonly isAlertVisible: boolean;
  readonly items: CardsProps<Item>['items'];
  readonly loading: CardsProps<Item>['loading'];
  readonly loadingText?: string;
  readonly sort: Sort;
}

const IS_ALERT_VISIBLE_CAPSULE: ReactCapsule<boolean> =
  new ReactCapsule<boolean>(true);

export default function usePublicationsContents(): State {
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
    sort,

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
  };
}
