import {
  type BrowserContext,
  type Contexts,
  type default as SentryProjectEvent,
} from '../types/sentry-project-event.js';
import assert from './assert.js';
import validateNumber from './validate-number.js';
import validateObject from './validate-object.js';
import validateString from './validate-string.js';

const validateContextsBrowser = (
  browser: unknown,
  browserContext: readonly string[],
): BrowserContext =>
  validateObject(
    browser,
    {
      name: validateString,
      version: validateString,
    },
    browserContext,
  );

const validateLocation = (
  location: unknown,
  locationContext: readonly string[],
): string | null => {
  assert(
    typeof location === 'string' || location === null,
    location,
    'a string or null',
    locationContext,
  );
  return location;
};

export default function validateSentryProjectEvent(
  value: unknown,
  context: readonly string[],
): SentryProjectEvent {
  return validateObject(
    value,
    {
      dateCreated: validateString,
      dateReceived: validateString,
      /*
       * Entries: readonly Entry[],
       * errors: readonly Error[],
       */
      eventID: validateString,
      // Fingerprints: readonly string[],
      groupID: validateString,
      id: validateString,
      location: validateLocation,
      message: validateString,
      /*
       * Metadata: Metadata | MetadataBase,
       * sdk: SdkInfo,
       */
      size: validateNumber,
      // Tags: readonly Tag[],
      title: validateString,
      /*
       * Type: 'error',
       * user: User,
       */

      contexts(
        contexts: unknown,
        contextsContext: readonly string[],
      ): Contexts {
        return validateObject(
          contexts,
          { browser: validateContextsBrowser },
          contextsContext,
        );
      },
    },
    context,
  );
}
