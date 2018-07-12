/// <reference types="jest" />
import { renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { MockFullStory, useFullStory } from '../index.js';

const ONCE = 1;
const TEST_INIT = jest.fn();
const TEST_IS_INITIALIZED = jest.fn();

function TestWrapper({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <MockFullStory init={TEST_INIT} isInitialized={TEST_IS_INITIALIZED}>
      {children}
    </MockFullStory>
  );
}

describe('useFullStory', (): void => {
  beforeEach((): void => {
    TEST_IS_INITIALIZED.mockReturnValue(false);
    TEST_INIT.mockImplementation((): void => {
      TEST_IS_INITIALIZED.mockReturnValue(true);
    });
  });

  it('should init', (): void => {
    renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        orgId: 'test-org-id',
      },
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      orgId: 'test-org-id',
    });
  });

  it('should not init on re-render', (): void => {
    const { rerender } = renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        orgId: 'test-org-id-1',
      },
    });

    // Re-render
    rerender({
      orgId: 'test-org-id-2',
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
  });

  // If two components try to mount simultaneously, only respect the first one.
  it('should not init twice', (): void => {
    renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        orgId: 'test-org-id-1',
      },
    });

    renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        orgId: 'test-org-id-2',
      },
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
  });
});
