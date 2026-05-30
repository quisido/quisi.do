import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useShallowMemo from '../index.js';

const INITIAL_OBJECT = {
  boolean: true,
  number: 1234,
  string: 'string',
};

describe('useShallowMemo', (): void => {
  it('should memoize shallow objects', (): void => {
    const { rerender, result } = renderHook(useShallowMemo, {
      initialProps: INITIAL_OBJECT,
    });

    expect(result.current).toBe(INITIAL_OBJECT);

    rerender({ ...INITIAL_OBJECT });

    expect(result.current).toBe(INITIAL_OBJECT);

    const CHANGED_OBJECT = {
      boolean: false,
      number: 6789,
      string: 'gnirts',
    };

    rerender(CHANGED_OBJECT);

    expect(result.current).toBe(CHANGED_OBJECT);
  });

  it('should memoize shallow objects with reordered keys', (): void => {
    const REORDERED_OBJECT = {
      ...{ number: INITIAL_OBJECT.number },
      ...{ string: INITIAL_OBJECT.string },
      ...{ boolean: INITIAL_OBJECT.boolean },
    };
    const { rerender, result } = renderHook(useShallowMemo, {
      initialProps: INITIAL_OBJECT,
    });

    rerender(REORDERED_OBJECT);

    expect(result.current).toBe(INITIAL_OBJECT);
  });

  it('should update when object keys change but values remain equal', (): void => {
    const INITIAL_KEY_OBJECT = {
      first: 'shared value',
    };
    const CHANGED_KEY_OBJECT = {
      second: 'shared value',
    };
    const { rerender, result } = renderHook(useShallowMemo, {
      initialProps: INITIAL_KEY_OBJECT,
    });

    rerender(CHANGED_KEY_OBJECT);

    expect(result.current).toBe(CHANGED_KEY_OBJECT);
  });
});
