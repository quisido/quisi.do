import { NANOSECONDS_PER_MILLISECOND } from '../constants/time.js';

const BASE = 10;
const CUMULATIVE_LAYOUT_SHIFT_DECIMALS = 4;

export const sanitizeCls = (cls: number | undefined): number | undefined => {
  if (typeof cls === 'undefined') {
    return;
  }

  return (
    Math.round(cls * BASE ** CUMULATIVE_LAYOUT_SHIFT_DECIMALS) /
    BASE ** CUMULATIVE_LAYOUT_SHIFT_DECIMALS
  );
};

export const sanitizeFcp = (fcp: number | undefined): number | undefined => {
  if (typeof fcp === 'undefined') {
    return;
  }

  return Math.round(fcp / NANOSECONDS_PER_MILLISECOND);
};

export const sanitizeInp = (inp: number | undefined): number | undefined => {
  if (typeof inp === 'undefined') {
    return;
  }

  return Math.round(inp / NANOSECONDS_PER_MILLISECOND);
};

export const sanitizeLcp = (lcp: number | undefined): number | undefined => {
  if (typeof lcp === 'undefined') {
    return;
  }

  return Math.round(lcp / NANOSECONDS_PER_MILLISECOND);
};

export const sanitizeLoadingTime = (
  loadingTime: number | undefined,
): number | undefined => {
  if (typeof loadingTime === 'undefined') {
    return;
  }

  return Math.round(loadingTime / NANOSECONDS_PER_MILLISECOND);
};
