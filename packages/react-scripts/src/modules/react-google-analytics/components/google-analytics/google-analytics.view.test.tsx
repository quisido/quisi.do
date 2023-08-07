import { render } from '@testing-library/react';
import GOOGLE_ANALYTICS_WINDOW from '../../constants/google-analytics-window';
import GoogleAnalytics from './google-analytics.view';

const FIRST = 0;
const TEST_TRACKING_ID = 'UA-123456789-1';
const TWO = 2;

describe('GoogleAnalytics', (): void => {
  it('should render children', (): void => {
    const { getByText } = render(
      <GoogleAnalytics trackingId={TEST_TRACKING_ID}>
        Hello world
      </GoogleAnalytics>,
    );
    getByText('Hello world');
  });

  it('should append a tracking script', (): void => {
    render(
      <GoogleAnalytics trackingId={TEST_TRACKING_ID}>
        Hello world
      </GoogleAnalytics>,
    );

    const script: HTMLScriptElement | null = document
      .getElementsByTagName('script')
      .item(FIRST);

    if (script === null) {
      throw new Error('Expected a script to be appended.');
    }

    expect(script.getAttribute('async')).toBe('');
    expect(script.getAttribute('src')).toBe(
      `https://www.googletagmanager.com/gtag/js?id=${TEST_TRACKING_ID}`,
    );
  });

  it('should create and populate a data layer', (): void => {
    render(
      <GoogleAnalytics trackingId={TEST_TRACKING_ID}>
        Hello world
      </GoogleAnalytics>,
    );

    expect(GOOGLE_ANALYTICS_WINDOW.dataLayer).toBeDefined();
    expect(GOOGLE_ANALYTICS_WINDOW.dataLayer).toHaveLength(TWO);
  });
});
