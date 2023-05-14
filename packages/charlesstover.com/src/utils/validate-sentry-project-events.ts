import EMPTY_ARRAY from '../constants/empty-array';
import { default as SentryProjectEvent } from '../types/sentry-project-event';
import validateArray from './validate-array';
import validateEvent from './validate-sentry-project-event';

export default function validateSentryProjectEvents(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): readonly SentryProjectEvent[] {
  return validateArray(value, validateEvent, context);
}
