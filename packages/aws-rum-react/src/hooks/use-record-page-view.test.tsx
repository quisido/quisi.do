import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MockAwsRumProvider, useRecordPageView } from '../index.js';

const TEST_RECORD_PAGE_VIEW = vi.fn();

describe('useRecordError', (): void => {
  it('should call recordError', (): void => {
    const { result } = renderHook(useRecordPageView, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <MockAwsRumProvider recordPageView={TEST_RECORD_PAGE_VIEW}>
            {children}
          </MockAwsRumProvider>
        );
      },
    });

    act((): void => {
      result.current('test page');
    });

    expect(TEST_RECORD_PAGE_VIEW).toHaveBeenCalledOnce();
    expect(TEST_RECORD_PAGE_VIEW).toHaveBeenLastCalledWith('test page');
  });
});
