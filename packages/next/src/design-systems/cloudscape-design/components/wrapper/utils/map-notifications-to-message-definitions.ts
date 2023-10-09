import { type FlashbarProps } from '@cloudscape-design/components/flashbar';
import type Notification from '../../../../../types/notification';
import mapNotificationToMessageDefinition from './map-notification-to-message-definition';

export default function mapNotificationsToCloudscapeMessageDefinitions(
  notifications: readonly Notification[],
): FlashbarProps.MessageDefinition[] {
  return notifications.map(mapNotificationToMessageDefinition);
}
