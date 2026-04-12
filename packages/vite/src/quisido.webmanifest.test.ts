import { assert, describe, expect, it } from 'vitest';
import type WebManifest from './types/web-manifest/web-manifest.js';
import findSplashScreenIcon from '../test/find-splash-screen-icon.js';
import mapRgbToHex from './utils/map-rgb-to-hex.js';
import { THEME } from './constants/theme.js';

/**
 * TypeScript cannot read JSON from non-JSON file extensions.
 * import {
 *   background_color as backgroundColor,
 *   icons,
 *   name,
 *   theme_color as themeColor,
 * } from '../public/quisido.webmanifest' assert { type: 'json' };
 */

describe('web manifest', async (): Promise<void> => {
  const response: Response = await window.fetch('/quisido.webmanifest');
  const {
    background_color: backgroundColor,
    icons,
    name,
    theme_color: themeColor,
  } = (await response.json()) as WebManifest;

  it('should match the theme', (): void => {
    expect(backgroundColor).toBe(mapRgbToHex(THEME.background));
  });

  // https://developer.chrome.com/docs/lighthouse/pwa/splash-screen/#recommendations
  it('should support a splash screen', (): void => {
    expect(typeof backgroundColor).toBe('string');
    expect(typeof name).toBe('string');
    expect(typeof themeColor).toBe('string');

    assert(typeof icons !== 'undefined');
    expect(icons.find(findSplashScreenIcon)).toBeDefined();
  });
});
