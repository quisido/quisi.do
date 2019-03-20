import EMPTY_ARRAY from '../constants/empty-array.js';
import { type default as SentryProjectEvent } from '../types/sentry-project-event.js';
import validateArray from './validate-array.js';
import validateEvent from './validate-sentry-project-event.js';

export default function validateSentryProjectEvents(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): readonly SentryProjectEvent[] {
  return validateArray(value, validateEvent, context);
}
