import EMPTY_ARRAY from '../constants/empty-array';
import {
  BrowserContext,
  Contexts,
  default as SentryProjectEvent,
} from '../types/sentry-project-event';
import assert from './assert';
import isArray from './is-array';
import isRecord from './is-record';
import mapObjectToKeys from './map-object-to-keys';
import validateNumber from './validate-number';
import validateString from './validate-string';

type Validator<T> = {
  [K in keyof T]: (value: unknown, context: readonly string[]) => T[K];
};

const validateArray = <T>(
  arr: unknown,
  validateItem: (item: unknown, context: readonly string[]) => T,
  context: readonly string[] = EMPTY_ARRAY,
): T[] => {
  assert(isArray(arr), arr, 'an array', context);

  const isValidItem = (item: unknown, index: number): item is T => {
    validateItem(item, [...context, index.toString()]);
    return true;
  };

  assert(arr.every(isValidItem), null, '');
  return arr;
};

const validateObject = <T>(
  value: unknown,
  validator: Validator<T>,
  context: readonly string[] = EMPTY_ARRAY,
): T => {
  assert(isRecord(value), value, 'an object', context);

  for (const key of mapObjectToKeys(validator)) {
    validator[key](value[key], [...context, key.toString()]);
  }

  return value as T;
};

const validateEvent = (
  value: unknown,
  context: readonly string[],
): SentryProjectEvent => {
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
};

export default function validateSentryProjectEvents(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): readonly SentryProjectEvent[] {
  return validateArray(value, validateEvent, context);
}
