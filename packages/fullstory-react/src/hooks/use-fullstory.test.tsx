/// <reference types="jest" />
import { renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import FullStoryAPIProvider from '../test/components/fullstory-api-provider/index.js';
import useFullStory from './use-fullstory.js';

const ONCE = 1;
const TEST_ANONYMIZE = jest.fn();
const TEST_IDENTIFY = jest.fn();
const TEST_INIT = jest.fn();
const TEST_SHUTDOWN = jest.fn();

function TestWrapper({ children }: Readonly<PropsWithChildren>): ReactElement {
  return (
    <FullStoryAPIProvider
      anonymize={TEST_ANONYMIZE}
      identify={TEST_IDENTIFY}
      init={TEST_INIT}
      shutdown={TEST_SHUTDOWN}
    >
      {children}
    </FullStoryAPIProvider>
  );
}

describe('useFullStory', (): void => {
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
