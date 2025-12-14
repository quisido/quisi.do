import { assert } from 'vitest';
import type Image from '../src/types/web-manifest/image.js';

const BASE = 10;
const SPLASH_SCREEN_ICON_SIZE = 512;

export default function findSplashScreenIcon({ sizes, type }: Image): boolean {
  assert(typeof sizes === 'string');
  const sizeMatches: RegExpExecArray | null =
    /^(?<widthStr>\d+)x(?<heightStr>\d+)$/u.exec(sizes);

  assert(sizeMatches !== null);
  const { groups } = sizeMatches;
  assert(typeof groups !== 'undefined');
  const { heightStr, widthStr } = groups;
  assert(typeof heightStr !== 'undefined');
  assert(typeof widthStr !== 'undefined');
  const height: number = parseInt(heightStr, BASE);
  const width: number = parseInt(widthStr, BASE);

  return (
    height >= SPLASH_SCREEN_ICON_SIZE &&
    width >= SPLASH_SCREEN_ICON_SIZE &&
    type === 'image/png'
  );
}
