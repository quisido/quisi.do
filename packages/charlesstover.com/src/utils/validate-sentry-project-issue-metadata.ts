import type { Metadata } from '../types/sentry-project-issue';
import validateObject from './validate-object';
import validateOptional from './validate-optional';
import validateString from './validate-string';

export default function validateSentryProjectIssueMetadata(
  metadata: unknown,
  contexts: readonly string[],
): Metadata {
  return validateObject(
    metadata,
    {
      filename: validateOptional(validateString),
      function: validateOptional(validateString),
      type: validateOptional(validateString),
      value: validateString,
    },
    contexts,
  );
}
