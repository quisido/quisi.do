import { mapUnknownToString } from 'fmrs';
import MetricName from '../constants/metric-name.js';
import getState from '../utils/get-state.js';
import getTelemetry from '../utils/get-telemetry.js';
import isConsole from '../utils/is-console.js';

export default function getConsole(): Console {
  const { console } = getState();

  if (isConsole(console)) {
    return console;
  }

  const { emitPublicMetric, logPrivateError, logPublicError } = getTelemetry();
  if (typeof console === 'undefined') {
    emitPublicMetric({ name: MetricName.MissingConsole });
    return console;
  }

  emitPublicMetric({ name: MetricName.InvalidConsole });

  logPrivateError(
    new Error('Invalid console', {
      cause: mapUnknownToString(console),
    }),
  );

  logPublicError(
    new Error('Invalid console', {
      cause: typeof console,
    }),
  );

  return console;
}
