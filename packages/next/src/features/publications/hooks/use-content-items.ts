import { useMemo } from 'react';
import type DevArticle from '../../../types/dev-article';
import type MediumArticle from '../../../types/medium-article';
import type Publication from '../types/publication';

interface Props {
  readonly devData: readonly DevArticle[] | undefined;
  readonly mediumData: Readonly<Record<string, MediumArticle>> | undefined;
}

export default function usePublicationsContentItems({
  devData,
  mediumData,
}: Props): readonly Publication[] {
  return useMemo((): readonly Publication[] => {
    const newItems: Publication[] = [];
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
        canonical_url: canonicalUrl,
        comments_count: commentsCount,
        public_reactions_count: publicReactionsCount,
        published_timestamp: publishedTimestamp,
        social_image: socialImage,
        title,
        url,
      } of devData) {
        const findExistingItem = ({
          url: existingUrl,
        }: Readonly<Publication>): boolean => existingUrl === canonicalUrl;
        const existingItem: Publication | undefined =
          newItems.find(findExistingItem);
        const reactions: number = commentsCount + publicReactionsCount;
        const views: number = Math.round(reactions * averageViewsPerReaction);
        if (typeof existingItem !== 'undefined') {
          existingItem.reactions += reactions;
          existingItem.views += views;
          continue;
        }
        newItems.push({
          dateTime: new Date(publishedTimestamp).getTime(),
          image: socialImage,
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
