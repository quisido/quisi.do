import { MILLISECONDS_PER_SECOND } from './time';

const EPOCH_OFFSET: Date = new Date('2024-01-01T00:00:00.000Z');
const EPOCH_OFFSET_TIMESTAMP: number = EPOCH_OFFSET.getTime();

export default Math.floor(
  EPOCH_OFFSET_TIMESTAMP / MILLISECONDS_PER_SECOND,
) satisfies number;
