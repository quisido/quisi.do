/// <reference types="jest" />
import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRecordError } from '..';
import { TestAwsRumProvider } from '../jest';

const ONCE = 1;
const TEST_RECORD_ERROR = jest.fn<unknown, [unknown]>();

describe('useRecordError', (): void => {
  it('should call recordError', async (): Promise<void> => {
    const { result } = renderHook(useRecordError, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <TestAwsRumProvider recordError={TEST_RECORD_ERROR}>
            {children}
          </TestAwsRumProvider>
        );
      },
    });

    await act((): void => {
      result.current('test error message');
    });

    expect(TEST_RECORD_ERROR).toHaveBeenCalledTimes(ONCE);
    expect(TEST_RECORD_ERROR).toHaveBeenLastCalledWith('test error message');
  });
});
