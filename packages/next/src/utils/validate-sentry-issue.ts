import EMPTY_ARRAY from '../constants/empty-array.js';
import type SentryIssue from '../types/sentry-issue.js';
import assert from './assert.js';
import isArray from './is-array.js';
import isNumber from './is-number.js';
import validateArray from './validate-array.js';
import validateBoolean from './validate-boolean.js';
import validateNumber from './validate-number.js';
import validateObject from './validate-object.js';
import validateMetadata from './validate-sentry-issue-metadata.js';
import validateString from './validate-string.js';
import validateTuple from './validate-tuple.js';

const validateStat = (
  value: unknown,
  context: readonly string[],
): readonly [number, number] => {
  assert(isArray(value), value, 'an array', context);
  assert(value.every(isNumber), value, 'an array of numbers', context);
  return validateTuple(value, context);
};

const validateStatsValue = (
  value: unknown,
  context: readonly string[],
): readonly (readonly [number, number])[] => validateArray(value, validateStat, context);

const validateStats = (
  value: unknown,
  context: readonly string[],
): Record<'24h', readonly (readonly [number, number])[]> => validateObject(
    value,
    {
      '24h': validateStatsValue,
    },
    context,
  );

export default function validateSentryIssue(
  value: unknown,
  context: readonly string[] = EMPTY_ARRAY,
): SentryIssue {
  return validateObject(
    value,
    {
      count: validateString,
      culprit: validateString,
      firstSeen: validateString,
      hasSeen: validateBoolean,
      id: validateString,
      isBookmarked: validateBoolean,
      isPublic: validateBoolean,
      isSubscribed: validateBoolean,
      lastSeen: validateString,
      metadata: validateMetadata,
      numComments: validateNumber,
      permalink: validateString,
      shortId: validateString,
      stats: validateStats,
      title: validateString,
      userCount: validateNumber,

      // e.g. 'error'
      level: validateString,

      // e.g. 'unresolved'
      status: validateString,

      // e.g. 'default'
      type: validateString,
    },
    context,
  );
}
