import type { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { useMemo } from 'react';
import type Notification from '../../../../types/notification';
import mapNotificationsToCloudscapeFlashbarPropsMessageDefinitions from '../../utils/map-notifications-to-cloudscape-flashbar-props-message-definitions';

const DEFAULT_NOTIFICATIONS: readonly Notification[] = Object.freeze([]);

export default function useCloudscapeWrapperNotifications(
  notifications: readonly Notification[] = DEFAULT_NOTIFICATIONS,
): readonly FlashbarProps.MessageDefinition[] {
  return useMemo((): readonly FlashbarProps.MessageDefinition[] => {
    return mapNotificationsToCloudscapeFlashbarPropsMessageDefinitions(
      notifications,
    );
  }, [notifications]);
}
