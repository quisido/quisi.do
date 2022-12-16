/// <reference types="jest" />
import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { useRecordEvent } from '..';
import { TestAwsRumProvider } from '../jest';

const ONCE = 1;
const TEST_RECORD_EVENT = jest.fn<unknown, [string, object]>();

describe('useRecordEvent', (): void => {
  it('should call recordEvent', async (): Promise<void> => {
    const { result } = renderHook(useRecordEvent, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <TestAwsRumProvider recordEvent={TEST_RECORD_EVENT}>
            {children}
          </TestAwsRumProvider>
        );
      },
    });

    await act((): void => {
      result.current('test event', { test: 'event' });
    });

    expect(TEST_RECORD_EVENT).toHaveBeenCalledTimes(ONCE);
    expect(TEST_RECORD_EVENT).toHaveBeenLastCalledWith('test event', {
      test: 'event',
    });
  });
});
