import { FlashbarProps } from '@awsui/components-react/flashbar';
import { useMemo, useState } from 'react';
import Item from '../types/item';
import mapDevArticlesToContent from '../utils/map-dev-articles-to-content';
import mapMissingBannersToContent from '../utils/map-missing-banners-to-content';

interface Props {
  items: readonly Item[];
}

export default function useNotifications({
  items,
}: Props): FlashbarProps.MessageDefinition[] {
  const [isDevArticleFlashVisible, setIsDevArticleFlashVisible] = useState(
    true,
  );
  const [
    isMissingBannerFlashVisible,
    setIsMissingBannerFlashVisible,
  ] = useState(true);

  return useMemo((): FlashbarProps.MessageDefinition[] => {
    const newNotifications: FlashbarProps.MessageDefinition[] = [];
    const devArticles: Item[] = [];
    const missingBanners: Item[] = [];
    for (const item of items) {
      if (item.type === 'dev') {
        devArticles.push(item);
      } else if (typeof item.image === 'undefined') {
        missingBanners.push(item);
      }
    }
    if (isDevArticleFlashVisible && devArticles.length > 0) {
      newNotifications.push({
        content: mapDevArticlesToContent(devArticles),
        dismissLabel: 'Dismiss',
        dismissible: true,
        header: devArticles.length !== 1 ? 'Dev.to articles' : 'Dev.to article',
        onDismiss(): void {
          setIsDevArticleFlashVisible(false);
        },
        type: 'warning',
      });
    }
    if (isMissingBannerFlashVisible && missingBanners.length > 0) {
      newNotifications.push({
        content: mapMissingBannersToContent(missingBanners),
        dismissLabel: 'Dismiss',
        dismissible: true,
        header:
          missingBanners.length !== 1 ? 'Missing banners' : 'Missing banner',
        onDismiss(): void {
          setIsMissingBannerFlashVisible(false);
        },
        type: 'warning',
      });
    }
    return newNotifications;
  }, [isDevArticleFlashVisible, isMissingBannerFlashVisible, items]);
}
