import mapNumberToSentryEventId from './map-number-to-sentry-event-id';

const EXPECTED_LENGTH = 32;
const HEXADECIMAL = /^[0-9a-f]+$/;
const TEST_NUMBER: number = Date.now();

describe('mapNumberToSentryEventId', (): void => {
  it('should return a hexadecimal value', (): void => {
    expect(mapNumberToSentryEventId(TEST_NUMBER)).toMatch(HEXADECIMAL);
  });

  it('should be 32 bytes', (): void => {
    expect(mapNumberToSentryEventId(TEST_NUMBER)).toHaveLength(EXPECTED_LENGTH);
  });
});
