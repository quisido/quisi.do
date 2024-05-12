import { mapUnknownToString } from 'fmrs';
import type Notification from '../types/notification.js';

export default function mapErrorToNotification(err: unknown): Notification {
  return {
    icon: '⚠',
    type: 'error',

    Message(): string {
      return mapUnknownToString(err);
    },
  };
}
