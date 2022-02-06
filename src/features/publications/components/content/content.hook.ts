import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useCallback, useMemo, useState } from 'react';
import ReactCapsule, { useCapsule } from 'react-capsule';
import useDevStats from '../../../../hooks/use-dev-stats';
import useMediumStats from '../../../../hooks/use-medium-stats';
import type ReadonlySelectChangeEvent from '../../../../types/readonly-select-change-event';
import Sort from '../../constants/publications-sort';
import useItems from '../../hooks/use-content-items';
import type Publication from '../../types/publication';
import filterItemsByMinimumViews from '../../utils/filter-publications-items-by-minimum-views';
import mapSortToFunction from '../../utils/map-publications-sort-to-function';

interface State {
  readonly handleBannerDismiss: VoidFunction;
  readonly handleSortChange: (event: ReadonlySelectChangeEvent) => void;
  readonly isBannerVisible: boolean;
  readonly items: readonly Publication[];
  readonly loading: string | undefined;
  readonly sort: Sort;
}

const IS_ALERT_VISIBLE_CAPSULE: ReactCapsule<boolean> =
  new ReactCapsule<boolean>(true);

export default function usePublicationsContents(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  const [isBannerVisible, setIsBannerVisible] = useCapsule(
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

  const items: readonly Publication[] = useItems({
    devData,
    mediumData,
  });

  return {
    isBannerVisible,
    sort,

    handleBannerDismiss: useCallback((): void => {
      setIsBannerVisible(false);
    }, [setIsBannerVisible]),

    handleSortChange: useCallback((e: ReadonlySelectChangeEvent): void => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const newSort: Sort = e.detail.selectedOption.value as Sort;
      setSort(newSort);
    }, []),

    items: useMemo((): readonly Publication[] => {
      const newItems: Publication[] = [...items];
      newItems.sort(mapSortToFunction(sort));
      return newItems.filter(filterItemsByMinimumViews);
    }, [items, sort]),

    loading: useMemo((): string | undefined => {
      if (!isDevLoading && !isMediumLoading) {
        return;
      }
      return translate('Loading publications') ?? '...';
    }, [isDevLoading, isMediumLoading, translate]),
  };
}
