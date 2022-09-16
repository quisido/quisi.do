import EMPTY_ARRAY from '../constants/empty-array';
import type SentryIssue from '../types/sentry-issue';
import validateArray from './validate-array';
import validateIssue from './validate-sentry-issue';

export default function validateSentryIssues(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): readonly SentryIssue[] {
  return validateArray(value, validateIssue, context);
}
