import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type Notification from '../../../../../types/notification';
import mapNotificationToMessageDefinition from './map-notification-to-message-definition';

export default function mapNotificationsToAwsuiFlashbarPropsMessageDefinitions(
  notifications: readonly Notification[],
): FlashbarProps.MessageDefinition[] {
  return notifications.map(mapNotificationToMessageDefinition);
}
