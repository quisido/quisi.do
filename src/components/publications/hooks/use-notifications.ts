import { FlashbarProps } from '@awsui/components-react/flashbar';
import { useMemo, useState } from 'react';
import Item from '../types/item';
import mapMissingBannersToContent from '../utils/map-missing-banners-to-content';

interface Props {
  items: readonly Item[];
}

export default function useNotifications({
  items,
}: Props): FlashbarProps.MessageDefinition[] {
  const [
    isMissingBannerFlashVisible,
    setIsMissingBannerFlashVisible,
  ] = useState(true);

  return useMemo((): FlashbarProps.MessageDefinition[] => {
    const newNotifications: FlashbarProps.MessageDefinition[] = [];
    const missingBanners: Item[] = [];
    for (const item of items) {
      if (typeof item.image === 'undefined') {
        missingBanners.push(item);
      }
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
  }, [isMissingBannerFlashVisible, items]);
}
