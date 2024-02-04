import mapUnknownToString from 'unknown2string/dist/utils/map-unknown-to-string.js';
import MetricName from '../constants/metric-name.js';
import type StatusCode from '../constants/status-code.js';
import createError from './create-error.js';

/**
 *   Unlike other errors, `assert` errors should be caught and re-thrown,
 * therefore they do not require a `cause`.
 */

export default function createAssert(
  emit: (
    name: MetricName,
    value?: null | number,
    dimensions?: Readonly<Record<string, number | string>>,
  ) => void,
): (
  assertion: boolean,
  message: string,
  status: StatusCode,
  data?: unknown,
) => asserts assertion {
  return function assert(
    assertion: boolean,
    message: string,
    status: StatusCode,
    data?: unknown,
  ): asserts assertion {
    if (assertion) {
      return;
    }

    emit(MetricName.FailedAssertion, null, {
      data: mapUnknownToString(data),
      status,
    });

    throw createError(message, status, data);
  };
}
