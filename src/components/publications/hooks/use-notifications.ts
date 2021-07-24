import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo, useState } from 'react';
import type PublicationCardItem from '../../../components/publication-cards/publication-cards.type.item';
import mapDevArticlesCountToHeader from '../map/map-dev-articles-count-to-header';
import mapDevArticlesToContent from '../map/map-dev-articles-to-content';
import mapMissingBannersCountToHeader from '../map/map-missing-banners-count-to-header';
import mapMissingBannersToContent from '../map/map-missing-banners-to-content';

interface Props {
  readonly items: readonly Readonly<PublicationCardItem>[];
}

const EMPTY = 0;

export default function useNotifications({
  items,
}: Props): readonly FlashbarProps.MessageDefinition[] {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const [isDevArticleFlashVisible, setIsDevArticleFlashVisible] =
    useState(true);
  const [isMissingBannerFlashVisible, setIsMissingBannerFlashVisible] =
    useState(true);

  return useMemo((): FlashbarProps.MessageDefinition[] => {
    const newNotifications: FlashbarProps.MessageDefinition[] = [];
    const devArticles: PublicationCardItem[] = [];
    const missingBanners: PublicationCardItem[] = [];
    for (const item of items) {
      if (item.type === 'dev') {
        devArticles.push(item);
      } else if (typeof item.image === 'undefined') {
        missingBanners.push(item);
      }
    }

    if (isDevArticleFlashVisible && devArticles.length > EMPTY) {
      newNotifications.push({
        content: mapDevArticlesToContent(devArticles),
        dismissLabel: translate('Dismiss'),
        dismissible: true,
        header: mapDevArticlesCountToHeader(devArticles.length),
        type: 'warning',
        onDismiss(): void {
          setIsDevArticleFlashVisible(false);
        },
      });
    }

    if (isMissingBannerFlashVisible && missingBanners.length > EMPTY) {
      newNotifications.push({
        content: mapMissingBannersToContent(missingBanners),
        dismissLabel: translate('Dismiss'),
        dismissible: true,
        header: mapMissingBannersCountToHeader(missingBanners.length),
        type: 'warning',
        onDismiss(): void {
          setIsMissingBannerFlashVisible(false);
        },
      });
    }

    return newNotifications;
  }, [isDevArticleFlashVisible, isMissingBannerFlashVisible, items, translate]);
}
