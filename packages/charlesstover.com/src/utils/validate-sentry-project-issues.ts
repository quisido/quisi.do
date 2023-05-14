import EMPTY_ARRAY from '../constants/empty-array';
import type SentryProjectIssue from '../types/sentry-project-issue';
import validateArray from './validate-array';
import validateIssue from './validate-sentry-project-issue';

export default function validateSentryProjectIssues(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): readonly SentryProjectIssue[] {
  return validateArray(value, validateIssue, context);
}
