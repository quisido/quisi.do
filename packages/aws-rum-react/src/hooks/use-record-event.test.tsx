/// <reference types="jest" />
import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { MockAwsRumProvider, useRecordEvent } from '../index.js';

const ONCE = 1;
const TEST_RECORD_EVENT = jest.fn<unknown, [string, object]>();

describe('useRecordEvent', (): void => {
  it('should call recordEvent', (): void => {
    const { result } = renderHook(useRecordEvent, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <MockAwsRumProvider recordEvent={TEST_RECORD_EVENT}>
            {children}
          </MockAwsRumProvider>
        );
      },
    });

    act((): void => {
      result.current('test event', { test: 'event' });
    });

    expect(TEST_RECORD_EVENT).toHaveBeenCalledTimes(ONCE);
    expect(TEST_RECORD_EVENT).toHaveBeenLastCalledWith('test event', {
      test: 'event',
    });
  });
});
