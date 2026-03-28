import { type ReactElement } from 'react';
import AlertDialog from '../design-systems/template/alert-dialog.js';
import type { NotificationProps } from '../contexts/notifications.js';

export default function Notification({
  Header,
  icon,
  Message,
  onDismiss,
  type,
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
    <AlertDialog {...labelProps} icon={icon} onDismiss={onDismiss} type={type}>
      <span style={{ fontSize: '0.8em' }}>
        <Message />
      </span>
    </AlertDialog>
  );
}
