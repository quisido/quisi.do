import type { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { useMemo } from 'react';
import EMPTY_ARRAY from '../../../../constants/empty-array';
import type Notification from '../../../../types/notification';
import mapNotificationsToCloudscapeFlashbarPropsMessageDefinitions from '../../utils/map-notifications-to-cloudscape-flashbar-props-message-definitions';

export default function useCloudscapeWrapperNotifications(
  notifications: readonly Notification[] = EMPTY_ARRAY,
): readonly FlashbarProps.MessageDefinition[] {
  return useMemo((): readonly FlashbarProps.MessageDefinition[] => {
    return mapNotificationsToCloudscapeFlashbarPropsMessageDefinitions(
      notifications,
    );
  }, [notifications]);
}
