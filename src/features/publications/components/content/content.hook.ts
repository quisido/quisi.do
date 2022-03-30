import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useCallback, useMemo, useState } from 'react';
import useDevStats from '../../../../hooks/use-dev-stats';
import useMediumStats from '../../../../hooks/use-medium-stats';
import filterByUndefined from '../../../../utils/filter-by-undefined';
import Sort from '../../constants/publications-sort';
import useItems from '../../hooks/use-content-items';
import type Publication from '../../types/publication';
import filterByPublicationsSort from '../../utils/filter-by-publications-sort';
import filterItemsByMinimumViews from '../../utils/filter-publications-items-by-minimum-views';
import mapSortToFunction from '../../utils/map-publications-sort-to-function';

interface State {
  readonly handleBannerDismiss: VoidFunction;
  readonly handleSortChange: (sort: string | undefined) => void;
  readonly isBannerVisible: boolean;
  readonly items: readonly Publication[];
  readonly loading: string | undefined;
  readonly sort: Sort;
}

const DEFAULT_SORT: Sort = Sort.ViewsPerDay;

export default function usePublicationsContents(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

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
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT);

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

    handleSortChange: useCallback((newSort: string | undefined): void => {
      if (filterByUndefined(newSort)) {
        setSort(DEFAULT_SORT);
        return;
      }
      if (!filterByPublicationsSort(newSort)) {
        throw new Error(
          `Expected a publication sort option, but received: ${newSort}`,
        );
      }
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
