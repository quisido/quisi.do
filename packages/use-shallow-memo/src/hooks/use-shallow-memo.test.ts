/// <reference types="jest" />
import { renderHook } from '@testing-library/react';
import useShallowMemo from "../index.js";

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

    rerender({...INITIAL_OBJECT});

    expect(result.current).toBe(INITIAL_OBJECT);

    const CHANGED_OBJECT = {
      boolean: false,
      number: 6789,
      string: 'gnirts',
    };

    rerender(CHANGED_OBJECT);

    expect(result.current).toBe(CHANGED_OBJECT);
  });
});
