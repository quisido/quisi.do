import { AlertProps } from '@awsui/components-react/alert';
import { CardsProps } from '@awsui/components-react/cards';
import { FlashbarProps } from '@awsui/components-react/flashbar';
import { useCallback, useMemo } from 'react';
import ReactCapsule, { useCapsule } from 'react-capsule';
import { useQuery } from 'react-query';
import DevArticle from '../../types/dev-article';
import MediumArticle from '../../types/medium-article';
import CARD_DEFINITION from './constants/card-definition';
import useNotifications from './hooks/use-notifications';
import Item from './types/item';
import filterItemsByMinimumViews from './utils/filter-items-by-minimum-views';
import sortItemsByViews from './utils/sort-items-by-views';

interface State {
  cardDefinition: CardsProps<Item>['cardDefinition'];
  handleAlertDismiss: AlertProps['onDismiss'];
  isAlertVisible: boolean;
  items: CardsProps<Item>['items'];
  loading: CardsProps<Item>['loading'];
  notifications: FlashbarProps.MessageDefinition[];
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
          'https://medium.cscdn.net/Charles_Stover.json',
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

  const items: CardsProps<Item>['items'] = useMemo((): CardsProps<Item>['items'] => {
    const newItems: Item[] = [];
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
        newItems.push({
          dateTime: firstPublishedAt,
          image:
            previewImage && `https://miro.medium.com/max/320/${previewImage}`,
          reactions: claps + updateNotificationSubscribers + upvotes,
          readingTime,
          reads,
          title,
          url: `https://charles-stover.medium.com/${slug}-${postId}`,
          views,
        });
      }
    }
    if (typeof devData !== 'undefined') {
      for (const article of devData) {
        console.log(article);
        /*
        TODO: Merge with Medium articles.
        newItems.push({
          dateTime: 0,
          image: ``,
          reactions: 0,
          reads: 0,
          title: article.title,
          url: '',
          views: 0,
        });
        */
      }
    }
    newItems.sort(sortItemsByViews);
    return newItems.filter(filterItemsByMinimumViews);
  }, [devData, mediumData]);

  const notifications: FlashbarProps.MessageDefinition[] = useNotifications({
    items,
  });

  const handleAlertDismiss = useCallback((): void => {
    setIsAlertVisible(false);
  }, [setIsAlertVisible]);

  return {
    cardDefinition: CARD_DEFINITION,
    handleAlertDismiss,
    isAlertVisible,
    items,
    loading: isDevLoading || isMediumLoading,
    notifications,
  };
}
