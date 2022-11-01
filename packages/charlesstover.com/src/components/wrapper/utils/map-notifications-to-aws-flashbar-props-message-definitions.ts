import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type Notification from '../../../types/notification';
import mapNotificationToAwsFlashbarPropsMessageDefinition from './map-notification-to-aws-flashbar-props-message-definition';

export default function mapNotificationsToAwsFlashbarPropsMessageDefinitions(
  notifications: readonly Notification[],
): FlashbarProps.MessageDefinition[] {
  return notifications.map(mapNotificationToAwsFlashbarPropsMessageDefinition);
}
