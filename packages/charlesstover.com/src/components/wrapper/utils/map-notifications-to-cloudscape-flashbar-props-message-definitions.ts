import type { FlashbarProps } from '@cloudscape-design/components/flashbar';
import type Notification from '../../../types/notification';
import mapNotificationToCloudscapeFlashbarPropsMessageDefinition from './map-notification-to-cloudscape-flashbar-props-message-definition';

export default function mapNotificationsToCloudscapeFlashbarPropsMessageDefinitions(
  notifications: readonly Notification[],
): FlashbarProps.MessageDefinition[] {
  return notifications.map(
    mapNotificationToCloudscapeFlashbarPropsMessageDefinition,
  );
}
