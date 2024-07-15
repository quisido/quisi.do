import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MockAwsRumProvider, useRecordEvent } from '../index.js';

const TEST_RECORD_EVENT = vi.fn();

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

    expect(TEST_RECORD_EVENT).toHaveBeenCalledOnce();
    expect(TEST_RECORD_EVENT).toHaveBeenLastCalledWith('test event', {
      test: 'event',
    });
  });
});
