/// <reference types="jest" />
import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { MockAwsRumProvider, useRecordPageView } from '../index.js';

const ONCE = 1;
const TEST_RECORD_PAGE_VIEW = jest.fn<unknown, [string]>();

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

    expect(TEST_RECORD_PAGE_VIEW).toHaveBeenCalledTimes(ONCE);
    expect(TEST_RECORD_PAGE_VIEW).toHaveBeenLastCalledWith('test page');
  });
});
