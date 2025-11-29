import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { assert, describe, expect, it } from 'vitest';
import { THEME } from './constants/theme.js';
import findSplashScreenIcon from './test/find-splash-screen-icon.js';
import type WebManifest from './types/web-manifest/web-manifest.js';
import mapRgbToHex from './utils/map-rgb-to-hex.js';

/**
 * TypeScript cannot read JSON from non-JSON file extensions.
 * import {
 *   background_color as backgroundColor,
 *   icons,
 *   name,
 *   theme_color as themeColor,
 * } from '../public/quisido.webmanifest' assert { type: 'json' };
 */

const {
  background_color: backgroundColor,
  icons,
  name,
  theme_color: themeColor,
} = JSON.parse(
  readFileSync(join(__dirname, '../public/quisido.webmanifest')).toString(),
) as WebManifest;

describe('web manifest', (): void => {
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
