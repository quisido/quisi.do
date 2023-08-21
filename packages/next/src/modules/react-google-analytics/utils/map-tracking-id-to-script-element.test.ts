import mapTrackingIdToScriptElement from './map-tracking-id-to-script-element';

const TEST_TRACKING_ID = 'UA-123456789-1';

describe('mapTrackingIdToScriptElement', (): void => {
  it('should return an async script element', (): void => {
    const script: HTMLScriptElement =
      mapTrackingIdToScriptElement(TEST_TRACKING_ID);

    expect(script.getAttribute('async')).toBe('');
    expect(script.getAttribute('src')).toBe(
      `https://www.googletagmanager.com/gtag/js?id=${TEST_TRACKING_ID}`,
    );
  });
});
