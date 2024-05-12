/// <reference types="jest" />
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import THEME from '../constants/theme.js';
import mapRgbToHex from '../utils/map-rgb-to-hex.js';

const BACKGROUND_COLOR: string = mapRgbToHex(THEME.background);
const LAYOUT_SCSS: string = readFileSync(join(__dirname, 'layout.module.scss')).toString();
const FOREGROUND_COLOR: string = mapRgbToHex(THEME.foreground);

describe('layout', (): void => {
  it('should provide the theme background color', (): void => {
    expect(LAYOUT_SCSS).toContain(`background-color: ${BACKGROUND_COLOR};`);
  });

  it('should provide the theme foreground color', (): void => {
    expect(LAYOUT_SCSS).toContain(`color: ${FOREGROUND_COLOR};`);
  });
});
