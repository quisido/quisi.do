import { renderHook } from '@testing-library/react';
import { PropsWithChildren, ReactElement } from 'react';
import TranslateFunctionContext from '../contexts/translate-function';
import { useTranslate } from '../index';
import TranslateFunctionType from '../types/translate-function';

const TEST_TRANSLATE_FUNCTION: TranslateFunctionType = (): string =>
  'test translation';

describe('useTranslate', (): void => {
  it('should return the translate function from context', (): void => {
    const { result } = renderHook(useTranslate, {
      wrapper({ children }: PropsWithChildren<unknown>): ReactElement {
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
