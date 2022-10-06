import type { FlashbarProps } from '@awsui/components-react/flashbar';
import { useMemo } from 'react';
import type Notification from '../../../../types/notification';
import mapNotificationsToFlashbarPropsMessageDefinitions from '../../utils/map-notifications-to-flashbar-props-message-definitions';

const DEFAULT_NOTIFICATIONS: readonly Notification[] = Object.freeze([]);

export default function useAwsWrapperNotifications(
  notifications: readonly Notification[] = DEFAULT_NOTIFICATIONS,
): readonly FlashbarProps.MessageDefinition[] {
  return useMemo((): readonly FlashbarProps.MessageDefinition[] => {
    return mapNotificationsToFlashbarPropsMessageDefinitions(notifications);
  }, [notifications]);
}
