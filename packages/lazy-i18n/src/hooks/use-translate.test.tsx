import { renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import TranslateFunctionContext from '../contexts/translate-function.js';
import { useTranslate } from '../index.js';
import type TranslateFunctionType from '../types/translate-function.js';

const TEST_TRANSLATE_FUNCTION: TranslateFunctionType = (): string =>
  'test translation';

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
