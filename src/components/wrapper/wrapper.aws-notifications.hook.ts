import type { FlashbarProps } from '@awsui/components-react/flashbar';
import useParamsMemo from 'use-params-memo';
import type Notification from '../../types/notification';
import mapNotificationsToFlashbarPropsMessageDefinitions from './utils/map-notifications-to-flashbar-props-message-definitions';

const DEFAULT_NOTIFICATIONS: readonly Notification[] = Object.freeze([]);

export default function useAwsNotifications(
  notifications: readonly Notification[] = DEFAULT_NOTIFICATIONS,
): FlashbarProps.MessageDefinition[] {
  return useParamsMemo(mapNotificationsToFlashbarPropsMessageDefinitions, [
    notifications,
  ]);
}
