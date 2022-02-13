import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type Notification from '../../../types/notification';
import mapNotificationToFlashbarPropsMessageDefinition from './map-notification-to-flashbar-props-message-definition';

export default function mapNotificationsToFlashbarPropsMessageDefinitions(
  notifications: readonly Notification[],
): FlashbarProps.MessageDefinition[] {
  return notifications.map(mapNotificationToFlashbarPropsMessageDefinition);
}
