import { AccountNumber } from '@quisido/workers-shared';
import { DEFAULT_D1_READ_DOUBLES } from './default-d1-read-doubles.js';

export const DEFAULT_D1_READ_DATA_POINT: AnalyticsEngineDataPoint = {
  doubles: DEFAULT_D1_READ_DOUBLES,
  indexes: [AccountNumber.Quisido.toString()],
};
