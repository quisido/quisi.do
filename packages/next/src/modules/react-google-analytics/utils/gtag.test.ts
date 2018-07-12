/// <reference types="jest" />
import type GoogleAnalyticsWindow from '../types/google-analytics-window.js';
import gtag from './gtag.js';

const googleAnalyticsWindow: GoogleAnalyticsWindow = window;
const ONE = 1;

const addDataLayer = (): void => {
  googleAnalyticsWindow.dataLayer = [];
};

const removeDataLayer = (): void => {
  delete googleAnalyticsWindow.dataLayer;
};

describe('gtag', (): void => {
  describe('with `dataLayer`', (): void => {
    beforeEach(addDataLayer);
    afterEach(removeDataLayer);

    it('should append to `dataLayer`', (): void => {
      gtag('a', true);
      expect(googleAnalyticsWindow.dataLayer).toBeInstanceOf(Array);
      expect(googleAnalyticsWindow.dataLayer).toHaveLength(ONE);
    });
  });

  describe('without `dataLayer`', (): void => {
    beforeEach(removeDataLayer);

    it('should create `dataLayer`', (): void => {
      gtag('a', true);
      expect(googleAnalyticsWindow.dataLayer).toBeInstanceOf(Array);
      expect(googleAnalyticsWindow.dataLayer).toHaveLength(ONE);
    });
  });
});
