import type { FlashbarProps } from '@cloudscape-design/components/flashbar';
import type { ReactNode } from 'react';
import ErrorNotificationHeader from '../../../../../components/error-notification-header';
import type Notification from '../../../../../types/notification';

const mapTypeToHeader = (type: 'error'): ReactNode => {
  switch (type) {
    case 'error':
      return <ErrorNotificationHeader />;
  }
};

export default function mapNotificationToCloudscapeFlashbarPropsMessageDefinition({
  CallToAction,
  message,
  onAction,
  onDismiss,
  type,
}: Readonly<Notification>): FlashbarProps.MessageDefinition {
  const messageDefinition: FlashbarProps.MessageDefinition = {
    content: message,
    header: mapTypeToHeader(type),
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
