import expect from 'expect';
import mapTrackingIdToScriptSrc from './map-tracking-id-to-script-src';

const TEST_TRACKING_ID = 'UA-123456789-1';

describe('mapTrackingIdToScriptSrc', (): void => {
  it('should return a script src', (): void => {
    expect(mapTrackingIdToScriptSrc(TEST_TRACKING_ID)).toBe(
      `https://www.googletagmanager.com/gtag/js?id=${TEST_TRACKING_ID}`,
    );
  });
});
