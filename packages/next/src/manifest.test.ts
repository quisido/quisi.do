import { background_color as backgroundColor, icons, name, theme_color as themeColor } from '../public/manifest.json';
import THEME from './constants/theme.js';
import findSplashScreenIcon from './test/find-splash-screen-icon.js';
import mapRgbToHex from './utils/map-rgb-to-hex.js';

describe('manifest.json', (): void => {
  it('should match the theme', (): void => {
    expect(backgroundColor).toBe(mapRgbToHex(THEME.background));
  });

  // https://developer.chrome.com/docs/lighthouse/pwa/splash-screen/#recommendations
  it('should support a splash screen', (): void => {
    expect(typeof backgroundColor).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof themeColor).toBe('string');
    expect(icons.find(findSplashScreenIcon)).toBeDefined();
  });
});
