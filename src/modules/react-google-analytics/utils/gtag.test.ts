import expect from 'expect';
import GOOGLE_ANALYTICS_WINDOW from '../constants/google-analytics-window';
import gtag from './gtag';

const ONE = 1;

const addDataLayer = (): void => {
  GOOGLE_ANALYTICS_WINDOW.dataLayer = [];
};

const removeDataLayer = (): void => {
  delete GOOGLE_ANALYTICS_WINDOW.dataLayer;
};

describe('gtag', (): void => {
  describe('with `dataLayer`', (): void => {
    beforeEach(addDataLayer);
    afterEach(removeDataLayer);

    it('should append to `dataLayer`', (): void => {
      gtag('a', true);
      expect(GOOGLE_ANALYTICS_WINDOW.dataLayer).toBeInstanceOf(Array);
      expect(GOOGLE_ANALYTICS_WINDOW.dataLayer).toHaveLength(ONE);
    });
  });

  describe('without `dataLayer`', (): void => {
    beforeEach(removeDataLayer);

    it('should create `dataLayer`', (): void => {
      gtag('a', true);
      expect(GOOGLE_ANALYTICS_WINDOW.dataLayer).toBeInstanceOf(Array);
      expect(GOOGLE_ANALYTICS_WINDOW.dataLayer).toHaveLength(ONE);
    });
  });
});
