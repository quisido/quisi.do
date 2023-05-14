import {
  BrowserContext,
  Contexts,
  default as SentryProjectEvent,
} from '../types/sentry-project-event';
import assert from './assert';
import validateNumber from './validate-number';
import validateObject from './validate-object';
import validateString from './validate-string';

export default function validateSentryProjectEvent(
  value: unknown,
  context: readonly string[],
): SentryProjectEvent {
  return validateObject(
    value,
    {
      contexts(
        contexts: unknown,
        contextsContext: readonly string[],
      ): Contexts {
        return validateObject(
          contexts,
          {
            browser(
              browser: unknown,
              browserContext: readonly string[],
            ): BrowserContext {
              return validateObject(
                browser,
                {
                  name: validateString,
                  version: validateString,
                },
                browserContext,
              );
            },
          },
          contextsContext,
        );
      },
      dateCreated: validateString,
      dateReceived: validateString,
      // entries: readonly Entry[],
      // errors: readonly Error[],
      eventID: validateString,
      // fingerprints: readonly string[],
      groupID: validateString,
      id: validateString,
      location(
        location: unknown,
        locationContext: readonly string[],
      ): string | null {
        assert(
          typeof location === 'string' || location === null,
          location,
          'a string or null',
          locationContext,
        );
        return location;
      },
      message: validateString,
      // metadata: Metadata | MetadataBase,
      // sdk: SdkInfo,
      size: validateNumber,
      // tags: readonly Tag[],
      title: validateString,
      // type: 'error',
      // user: User,
    },
    context,
  );
}
