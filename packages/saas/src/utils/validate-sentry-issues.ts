import EMPTY_ARRAY from '../constants/empty-array.js';
import type SentryIssue from '../types/sentry-issue.js';
import validateArray from './validate-array.js';
import validateIssue from './validate-sentry-issue.js';

export default function validateSentryIssues(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): readonly SentryIssue[] {
  return validateArray(value, validateIssue, context);
}
