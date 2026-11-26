import { describe, expect, it } from 'vitest';
import mapOscpuToName from './map-oscpu-to-name.js';

describe('mapOscpuToName', (): void => {
  it('maps known operating systems', (): void => {
    expect(mapOscpuToName('Windows NT 10.0')).toBe('Windows 10');
  });

  it('returns unknown and inherited property names unchanged', (): void => {
    expect(mapOscpuToName('unknown')).toBe('unknown');
    expect(mapOscpuToName('constructor')).toBe('constructor');
    expect(mapOscpuToName('toString')).toBe('toString');
    expect(mapOscpuToName('__proto__')).toBe('__proto__');
  });

  it('returns undefined for an undefined input', (): void => {
    expect(mapOscpuToName(undefined)).toBeUndefined();
  });
});
