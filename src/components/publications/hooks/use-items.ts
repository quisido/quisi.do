import { useMemo } from 'react';
import DevArticle from '../../../types/dev-article';
import MediumArticle from '../../../types/medium-article';
import Item from '../types/item';

interface Props {
  devData?: DevArticle[];
  mediumData?: Record<string, MediumArticle>;
}

export default function useItems({ devData, mediumData }: Props): Item[] {
  return useMemo((): Item[] => {
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

    return newItems;
  }, [devData, mediumData]);
}
