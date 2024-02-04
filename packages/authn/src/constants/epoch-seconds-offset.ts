import { MILLISECONDS_PER_SECOND } from './time.js';

/**
 *   By offsetting the Unix epoch to January 2024, our timestamps take less
 * spaces in our database tables.
 */

const EPOCH_OFFSET: Date = new Date('2024-01-01T00:00:00.000Z');
const EPOCH_OFFSET_TIMESTAMP: number = EPOCH_OFFSET.getTime();

export default Math.floor(
  EPOCH_OFFSET_TIMESTAMP / MILLISECONDS_PER_SECOND,
) satisfies number;
