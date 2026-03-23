import { mapToString } from 'fmrs';
import type { NoActionNotification } from '../types/notification.js';

export default function mapErrorToNotification(
  err: unknown,
): NoActionNotification {
  return {
    icon: '⚠',
    Message(): string {
      return mapToString(err);
    },
    type: 'error',
  };
}
