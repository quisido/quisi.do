import type { FlashbarProps } from '@cloudscape-design/components/flashbar';
import type Notification from '../../../../../types/notification';

export default function mapNotificationToCloudscapeFlashbarPropsMessageDefinition({
  CallToAction,
  Header,
  message,
  onAction,
  onDismiss,
  type,
}: Readonly<Notification>): FlashbarProps.MessageDefinition {
  const messageDefinition: FlashbarProps.MessageDefinition = {
    content: message,
    header: typeof Header !== 'undefined' ? <Header /> : undefined,
    type,
  };

  if (typeof CallToAction === 'function' && typeof onAction === 'function') {
    messageDefinition.onButtonClick = onAction;
    messageDefinition.buttonText = <CallToAction />;
  }

  if (typeof onDismiss === 'function') {
    messageDefinition.dismissLabel = 'Dismiss';
    messageDefinition.dismissible = true;
    messageDefinition.onDismiss = onDismiss;
  } else {
    messageDefinition.dismissible = false;
  }

  return messageDefinition;
}
