import { type ReactElement } from 'react';
import Banner from '../modules/quisi/banner.js';
import type NotificationType from '../types/notification.js';

export default function Notification({
  Header,
  icon,
  Message,
  onDismiss,
  type,
}: NotificationType): ReactElement {
  return (
    <Banner icon={icon} onDismiss={onDismiss} type={type}>
      {typeof Header !== 'undefined' && <Header />}
      <span style={{ fontSize: '0.8em' }}>
        <Message />
      </span>
    </Banner>
  );
}
