import EMPTY_ARRAY from '../constants/empty-array';
import type SentryIssue from '../types/sentry-issue';
import assert from './assert';
import isArray from './is-array';
import isNumber from './is-number';
import validateArray from './validate-array';
import validateBoolean from './validate-boolean';
import validateNumber from './validate-number';
import validateObject from './validate-object';
import validateMetadata from './validate-sentry-issue-metadata';
import validateString from './validate-string';
import validateTuple from './validate-tuple';

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
): readonly (readonly [number, number])[] => {
  return validateArray(value, validateStat, context);
};

const validateStats = (
  value: unknown,
  context: readonly string[],
): Record<'24h', readonly (readonly [number, number])[]> => {
  return validateObject(
    value,
    {
      '24h': validateStatsValue,
    },
    context,
  );
};

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
      level: validateString, // 'error'
      metadata: validateMetadata,
      numComments: validateNumber,
      permalink: validateString,
      shortId: validateString,
      stats: validateStats,
      status: validateString, // 'unresolved'
      title: validateString,
      type: validateString, // 'default'
      userCount: validateNumber,
    },
    context,
  );
}
