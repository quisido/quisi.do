import { background_color as backgroundColor } from '../public/manifest.json';
import THEME from './constants/theme.js';
import mapRgbToHex from './utils/map-rgb-to-hex.js';

describe('manifest.json', (): void => {
  it('should match the theme', (): void => {
    expect(backgroundColor).toBe(mapRgbToHex(THEME.background));
  });
});
