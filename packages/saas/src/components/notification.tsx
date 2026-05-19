import { type ReactElement, type ReactNode } from 'react';
import type { NotificationProps } from '../contexts/notifications.js';
import { Dialog } from '../design-systems/template/index.js';

export default function Notification({
  description,
  Header,
  icon,
  Message,
  onDismiss,
  // type,
}: NotificationProps): ReactElement {
  const Heading = (): ReactNode => {
    if (Header === undefined) {
      return 'Notification';
    }

    return <Header />;
  };

  return (
    <Dialog
      description={description}
      heading={<Heading />}
      onDismiss={onDismiss}
    >
      {icon}
      <span style={{ fontSize: '0.8em' }}>
        <Message />
      </span>
    </Dialog>
  );
}
