import { toString } from 'fmrs';
import type { NoActionNotification } from '../types/notification.js';

export default function mapErrorToNotification(
  err: unknown,
): NoActionNotification {
  return {
    description: 'An error occurred.',
    icon: '⚠',
    Message(): string {
      return toString(err);
    },
    type: 'error',
  };
}
