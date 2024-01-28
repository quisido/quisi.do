'use client';

import type { ReactElement } from 'react';
import { useNotifications } from '../contexts/notifications.js';
import mapComponentToPropMapper from '../utils/map-component-to-prop-mapper.js';
import Notification from './notifications/notification.js';

const mapNotificationToElement = mapComponentToPropMapper(Notification);

export default function Notifications(): ReactElement {
  // Context
  const [notifications] = useNotifications();

  return (
    <div
      style={{
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
    >
      {notifications.map(mapNotificationToElement)}
    </div>
  );
}
