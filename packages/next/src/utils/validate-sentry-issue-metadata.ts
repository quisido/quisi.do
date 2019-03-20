import { type Metadata } from '../types/sentry-issue.js';
import validateObject from './validate-object.js';
import validateOptional from './validate-optional.js';
import validateString from './validate-string.js';

export default function validateSentryIssueMetadata(
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
