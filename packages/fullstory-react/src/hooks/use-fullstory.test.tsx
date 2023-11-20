/// <reference types="jest" />
import { renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import MockFullStory from '../components/mock-fullstory.js';
import useFullStory from './use-fullstory.js';

const ONCE = 1;
const TEST_ANONYMIZE = jest.fn();
const TEST_IDENTIFY = jest.fn();
const TEST_INIT = jest.fn();
const TEST_IS_INITIALIZED = jest.fn();
const TEST_SHUTDOWN = jest.fn();

function TestWrapper({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <MockFullStory
      anonymize={TEST_ANONYMIZE}
      identify={TEST_IDENTIFY}
      init={TEST_INIT}
      isInitialized={TEST_IS_INITIALIZED}
      shutdown={TEST_SHUTDOWN}
    >
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
    expect(TEST_SHUTDOWN).not.toHaveBeenCalled();
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      orgId: 'test-org-id',
    });
  });

  it('should shutdown on unmount', (): void => {
    const { unmount } = renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        orgId: 'test-org-id',
      },
    });

    expect(TEST_SHUTDOWN).not.toHaveBeenCalled();

    unmount();

    expect(TEST_SHUTDOWN).toHaveBeenCalledTimes(ONCE);
    expect(TEST_SHUTDOWN).toHaveBeenLastCalledWith();
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
  it('should not init a second time', (): void => {
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

  // Shutdowns require `restart` to be called 30 minutes after shutting down.
  it('should not shutdown on re-render', (): void => {
    const { rerender } = renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        orgId: 'test-org-id-1',
      },
    });

    rerender({
      orgId: 'test-org-id-2',
    });

    expect(TEST_SHUTDOWN).not.toHaveBeenCalled();
  });

  it('should anonymize if no user UID exists', (): void => {
    renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        devMode: false,
        orgId: 'test-org-id',
      },
    });

    expect(TEST_ANONYMIZE).toHaveBeenCalledTimes(ONCE);
    expect(TEST_ANONYMIZE).toHaveBeenLastCalledWith();
    expect(TEST_IDENTIFY).not.toHaveBeenCalled();
  });

  it('should anonymize in dev mode', (): void => {
    renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        devMode: true,
        orgId: 'test-org-id',
        userUid: 'test-user-uid',
      },
    });

    expect(TEST_ANONYMIZE).toHaveBeenCalledTimes(ONCE);
    expect(TEST_ANONYMIZE).toHaveBeenLastCalledWith();
    expect(TEST_IDENTIFY).not.toHaveBeenCalled();
  });

  it('should identify', (): void => {
    renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        devMode: false,
        orgId: 'test-org-id',
        userUid: 'test-user-uid',
        userVars: {
          displayName: 'test display name',
          email: 'test@email',
        },
      },
    });

    expect(TEST_ANONYMIZE).not.toHaveBeenCalled();
    expect(TEST_IDENTIFY).toHaveBeenCalledTimes(ONCE);
    expect(TEST_IDENTIFY).toHaveBeenLastCalledWith('test-user-uid', {
      displayName: 'test display name',
      email: 'test@email',
    });
  });

  it('should anonymize on unmount', (): void => {
    const { unmount } = renderHook(useFullStory, {
      wrapper: TestWrapper,
      initialProps: {
        devMode: false,
        orgId: 'test-org-id',
        userUid: 'test-user-id',
      },
    });

    expect(TEST_ANONYMIZE).not.toHaveBeenCalled();

    unmount();

    expect(TEST_ANONYMIZE).toHaveBeenCalledTimes(ONCE);
    expect(TEST_ANONYMIZE).toHaveBeenLastCalledWith();
  });
});
