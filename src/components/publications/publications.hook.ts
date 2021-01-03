import { AlertProps } from '@awsui/components-react/alert';
import { CardsProps } from '@awsui/components-react/cards';
import { FlashbarProps } from '@awsui/components-react/flashbar';
import { NonCancelableCustomEvent } from '@awsui/components-react/internal/events';
import { SelectProps } from '@awsui/components-react/select';
import { useCallback, useMemo, useState } from 'react';
import ReactCapsule, { useCapsule } from 'react-capsule';
import { useQuery } from 'react-query';
import DevArticle from '../../types/dev-article';
import MediumArticle from '../../types/medium-article';
import CARD_DEFINITION from './constants/card-definition';
import Sort from './constants/sort';
import SORT_BY_VIEWS_PER_DAY_OPTION from './constants/sort-by-views-per-day-option';
import SORT_OPTIONS from './constants/sort-options';
import useNotifications from './hooks/use-notifications';
import Item from './types/item';
import filterItemsByMinimumViews from './utils/filter-items-by-minimum-views';
import sortItemsByPublicationDate from './utils/sort-items-by-publication-date';
import sortItemsByReactions from './utils/sort-items-by-reactions';
import sortItemsByReactionsPerDay from './utils/sort-items-by-reactions-per-day';
import sortItemsByReactionsPerView from './utils/sort-items-by-reactions-per-view';
import sortItemsByReadingTime from './utils/sort-items-by-reading-time';
import sortItemsByViews from './utils/sort-items-by-views';
import sortItemsByViewsPerDay from './utils/sort-items-by-views-per-day';

type SortFunction<Item> = (a: Item, b: Item) => -1 | 0 | 1;

interface State {
  cardDefinition: CardsProps<Item>['cardDefinition'];
  handleAlertDismiss: AlertProps['onDismiss'];
  handleSortChange: SelectProps['onChange'];
  isAlertVisible: boolean;
  items: CardsProps<Item>['items'];
  loading: CardsProps<Item>['loading'];
  notifications: FlashbarProps.MessageDefinition[];
  selectedSortOption: SelectProps.Option;
  sortOptions: SelectProps.Options;
}

const IS_ALERT_VISIBLE_CAPSULE: ReactCapsule<boolean> = new ReactCapsule<boolean>(
  true,
);

export default function usePublications(): State {
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

  const [sort, setSort] = useState(Sort.ViewsPerDay);

  const selectedSortOption: SelectProps.Option = useMemo((): SelectProps.Option => {
    const findSelectedSortOption = ({ value }: SelectProps.Option): boolean =>
      value === sort;
    const newSelectedSortOption:
      | SelectProps.Option
      | undefined = SORT_OPTIONS.find(findSelectedSortOption);
    return newSelectedSortOption || SORT_BY_VIEWS_PER_DAY_OPTION;
  }, [sort]);

  const sortItems: SortFunction<Item> = useMemo((): SortFunction<Item> => {
    switch (sort) {
      case Sort.PublicationDate:
        return sortItemsByPublicationDate;
      case Sort.Reactions:
        return sortItemsByReactions;
      case Sort.ReactionsPerDay:
        return sortItemsByReactionsPerDay;
      case Sort.ReactionsPerView:
        return sortItemsByReactionsPerView;
      case Sort.ReadingTime:
        return sortItemsByReadingTime;
      case Sort.Views:
        return sortItemsByViews;
      case Sort.ViewsPerDay:
        return sortItemsByViewsPerDay;
    }
  }, [sort]);

  const handleAlertDismiss = useCallback((): void => {
    setIsAlertVisible(false);
  }, [setIsAlertVisible]);

  const handleSortChange = useCallback(
    (e: NonCancelableCustomEvent<SelectProps.ChangeDetail>): void => {
      const newSort: Sort = e.detail.selectedOption.value as Sort;
      setSort(newSort);
    },
    [],
  );

  const items: CardsProps<Item>['items'] = useMemo((): CardsProps<Item>['items'] => {
    const newItems: Item[] = [];
    let totalReactions = 0;
    let totalViews = 0;
    if (typeof mediumData !== 'undefined') {
      for (const [
        slug,
        {
          claps,
          firstPublishedAt,
          postId,
          previewImage,
          readingTime,
          reads,
          title,
          updateNotificationSubscribers,
          upvotes,
          views,
        },
      ] of Object.entries(mediumData)) {
        const reactions: number =
          claps + updateNotificationSubscribers + upvotes;
        totalReactions += reactions;
        totalViews += reads;
        newItems.push({
          dateTime: firstPublishedAt,
          image:
            previewImage && `https://miro.medium.com/max/320/${previewImage}`,
          reactions,
          readingTime,
          title,
          type: 'medium',
          url: `https://charles-stover.medium.com/${slug}-${postId}`,
          views,
        });
      }
    }

    const averageViewsPerReaction = totalViews / totalReactions;
    if (typeof devData !== 'undefined') {
      for (const {
        canonical_url,
        comments_count,
        public_reactions_count,
        published_timestamp,
        social_image,
        title,
        url,
      } of devData) {
        const findExistingItem = ({ url: existingUrl }: Item): boolean =>
          existingUrl === canonical_url;
        const existingItem: Item | undefined = newItems.find(findExistingItem);
        const reactions: number = comments_count + public_reactions_count;
        const views: number = Math.round(reactions * averageViewsPerReaction);
        if (typeof existingItem !== 'undefined') {
          existingItem.reactions += reactions;
          existingItem.views += views;
          continue;
        }
        newItems.push({
          dateTime: new Date(published_timestamp).getTime(),
          image: social_image,
          reactions,
          title,
          type: 'dev',
          url,
          views,
        });
      }
    }
    newItems.sort(sortItems);
    return newItems;
  }, [devData, mediumData, sortItems]);

  const notifications: FlashbarProps.MessageDefinition[] = useNotifications({
    items,
  });

  return {
    cardDefinition: CARD_DEFINITION,
    handleAlertDismiss,
    handleSortChange,
    isAlertVisible,
    items: useMemo((): Item[] => {
      return items.filter(filterItemsByMinimumViews);
    }, [items]),
    loading: isDevLoading || isMediumLoading,
    notifications,
    selectedSortOption,
    sortOptions: SORT_OPTIONS,
  };
}
