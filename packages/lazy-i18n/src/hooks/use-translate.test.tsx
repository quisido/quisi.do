import { renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import TranslateFunctionContext from '../contexts/translate-function.js';
import { useTranslate } from '../index.js';

const TEST_TRANSLATE_FUNCTION = vi.fn();

describe('useTranslate', (): void => {
  it('should return the translate function from context', (): void => {
    const { result } = renderHook(useTranslate, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <TranslateFunctionContext.Provider value={TEST_TRANSLATE_FUNCTION}>
            {children}
          </TranslateFunctionContext.Provider>
        );
      },
    });
    expect(result.current).toBe(TEST_TRANSLATE_FUNCTION);
  });
});
