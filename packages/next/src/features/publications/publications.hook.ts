'use client';

import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useCallback, useMemo, useState } from 'react';
import useAsyncState from '../../modules/use-async-state';
import DevArticle from '../../types/dev-article';
import MediumArticle from '../../types/medium-article';
import Sort from './constants/publications-sort';
import useItems from './hooks/use-content-items';
import type Publication from './types/publication';
import filterByPublicationsSort from './utils/filter-by-publications-sort';
import filterItemsByMinimumViews from './utils/filter-publications-items-by-minimum-views';
import mapSortToFunction from './utils/map-publications-sort-to-function';

interface State {
  readonly handleMediumApiBannerDismiss: VoidFunction;
  readonly handleMinimumViewsBannerDismiss: VoidFunction;
  readonly handleSortChange: (sort: string | undefined) => void;
  readonly isMediumApiBannerVisible: boolean;
  readonly isMinimumViewsBannerVisible: boolean;
  readonly items: readonly Publication[];
  readonly loading: string | undefined;
  readonly sort: Sort;
}

const DEFAULT_SORT: Sort = Sort.ViewsPerDay;

const getDevData = async (): Promise<readonly DevArticle[]> => {
  const response: Response = await window.fetch(
    'https://dev.to/api/articles?username=charlesstover',
  );
  return response.json();
};

const getMediumData = async (): Promise<Record<string, MediumArticle>> => {
  const response: Response = await window.fetch(
    'https://medium.cscdn.net/charles-stover.json',
  );

  return response.json();
};

export default function usePublicationsContents(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const { data: devData, loading: isDevLoading } = useAsyncState(getDevData);
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT);

  const { data: mediumData, loading: isMediumLoading } =
    useAsyncState(getMediumData);

  const [isMediumApiBannerVisible, setIsMediumApiBannerVisible] =
    useState(true);

  const [isMinimumViewsBannerVisible, setIsMinimumViewsBannerVisible] =
    useState(true);

  const items: readonly Publication[] = useItems({
    devData,
    mediumData,
  });

  return {
    isMediumApiBannerVisible,
    isMinimumViewsBannerVisible,
    sort,

    handleMediumApiBannerDismiss: useCallback((): void => {
      setIsMediumApiBannerVisible(false);
    }, []),

    handleMinimumViewsBannerDismiss: useCallback((): void => {
      setIsMinimumViewsBannerVisible(false);
    }, []),

    handleSortChange: useCallback((newSort: string | undefined): void => {
      if (typeof newSort === 'undefined') {
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
