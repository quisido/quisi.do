import type { ReactElement } from 'react';
import Banner from '../../components/banner.js';
import type NotificationType from '../../types/notification.js';

export default function Notification({
  Header,
  message,
  onDismiss,
  type,
}: NotificationType): ReactElement {
  return (
    <Banner onDismiss={onDismiss} type={type}>
      {Header && <Header />}
      <span style={{ fontSize: '0.8em' }}>{message}</span>
    </Banner>
  );
}
