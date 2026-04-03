import { type ReactElement } from 'react';
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
  const labelProps = (() => {
    if (Header === undefined) {
      return {
        label: 'Notification',
      };
    }

    return {
      heading: <Header />,
    };
  })();

  return (
    // type={type}
    <Dialog {...labelProps} description={description} onDismiss={onDismiss}>
      {icon}
      <span style={{ fontSize: '0.8em' }}>
        <Message />
      </span>
    </Dialog>
  );
}
