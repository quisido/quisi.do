import { mapToString } from 'fmrs';
import type Notification from '../types/notification.js';

export default function mapErrorToNotification(err: unknown): Notification {
  return {
    icon: '⚠',
    Message(): string {
      return mapToString(err);
    },
    type: 'error',
  };
}
