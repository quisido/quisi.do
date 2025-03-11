import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import THEME from '../constants/theme.js';
import mapRgbToHex from '../utils/map-rgb-to-hex.js';

const BACKGROUND_COLOR: string = mapRgbToHex(THEME.background);
const FOREGROUND_COLOR: string = mapRgbToHex(THEME.foreground);
const SCSS: string = readFileSync(join(__dirname, 'body.scss')).toString();

describe('Body', (): void => {
  it('should provide the theme background color', (): void => {
    expect(SCSS).toContain(`background-color: ${BACKGROUND_COLOR};`);
  });

  it('should provide the theme foreground color', (): void => {
    expect(SCSS).toContain(`color: ${FOREGROUND_COLOR};`);
  });
});
