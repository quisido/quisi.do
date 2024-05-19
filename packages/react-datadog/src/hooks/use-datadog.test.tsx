import type { datadogRum } from '@datadog/browser-rum';
import { renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import DatadogRumContext from '../contexts/datadog-rum.js';
import useDatadog from '../index.js';
import composeComponents from '../test/utils/compose-components.js';
import type User from '../types/user.js';

const ONCE = 1;
const TEST_INIT = vi.fn();
const TEST_REMOVE_USER = vi.fn();
const TEST_SET_USER = vi.fn();
const TEST_START_SESSION_REPLAY_RECORDING = vi.fn();
const TEST_STOP_SESSION_REPLAY_RECORDING = vi.fn();
const TWICE = 2;

const TEST_RUM: typeof datadogRum = {
  addAction: vi.fn(),
  addError: vi.fn(),
  addFeatureFlagEvaluation: vi.fn(),
  addTiming: vi.fn(),
  clearGlobalContext: vi.fn(),
  clearUser: TEST_REMOVE_USER,
  getGlobalContext: vi.fn(),
  getInitConfiguration: vi.fn(),
  getInternalContext: vi.fn(),
  getSessionReplayLink: vi.fn(),
  getUser: vi.fn(),
  init: TEST_INIT,
  onReady: vi.fn(),
  removeGlobalContextProperty: vi.fn(),
  removeUserProperty: vi.fn(),
  setGlobalContext: vi.fn(),
  setGlobalContextProperty: vi.fn(),
  setTrackingConsent: vi.fn(),
  setUser: TEST_SET_USER,
  setUserProperty: vi.fn(),
  startSessionReplayRecording: TEST_START_SESSION_REPLAY_RECORDING,
  startView: vi.fn() as typeof datadogRum['startView'],
  stopSession: vi.fn(),
  stopSessionReplayRecording: TEST_STOP_SESSION_REPLAY_RECORDING,
  version: '0.0.0',
};

const TEST_USER: User = {
  id: 'test-id',
  email: 'foo@bar.com',
  name: 'test-name',
};

function TestRumProvider({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return (
    <DatadogRumContext.Provider value={TEST_RUM}>
      {children}
    </DatadogRumContext.Provider>
  );
}

describe('useDatadog', (): void => {
  it('should call `init`', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
      wrapper: composeComponents(StrictMode, TestRumProvider),
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      applicationId: 'test-application-id',
      clientToken: 'test-client-token',
      site: 'datadoghq.com',
    });
  });

  it('should not call `init` if `enabled` is false', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        enabled: false,
      },
      wrapper: composeComponents(StrictMode, TestRumProvider),
    });

    expect(TEST_INIT).not.toHaveBeenCalled();
  });

  it('should call `init` if the configuration has changed', (): void => {
    const { rerender } = renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        version: 'test-version-1',
      },
      wrapper: composeComponents(StrictMode, TestRumProvider),
    });

    rerender({
      applicationId: 'test-application-id',
      clientToken: 'test-client-token',
      version: 'test-version-2',
    });

    expect(TEST_INIT).toHaveBeenCalledTimes(TWICE);
  });

  it('should start session replay recording on mount', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
      wrapper: TestRumProvider,
    });

    expect(TEST_START_SESSION_REPLAY_RECORDING).toHaveBeenCalledTimes(ONCE);
    expect(TEST_START_SESSION_REPLAY_RECORDING).toHaveBeenLastCalledWith();
  });

  it('should not start session replay recording when `enabled` is false', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        enabled: false,
      },
      wrapper: TestRumProvider,
    });

    expect(TEST_START_SESSION_REPLAY_RECORDING).not.toHaveBeenCalled();
  });

  it('should not start session replay recording when `sessionReplayRecording` is false', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        sessionReplayRecording: false,
      },
      wrapper: composeComponents(StrictMode, TestRumProvider),
    });

    expect(TEST_START_SESSION_REPLAY_RECORDING).not.toHaveBeenCalled();
  });

  it('should stop session replay recording on unmount', (): void => {
    const { unmount } = renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
      wrapper: TestRumProvider,
    });

    unmount();

    expect(TEST_STOP_SESSION_REPLAY_RECORDING).toHaveBeenCalledTimes(ONCE);
    expect(TEST_STOP_SESSION_REPLAY_RECORDING).toHaveBeenLastCalledWith();
  });

  it('should not set the user when not provided', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
      },
      wrapper: composeComponents(StrictMode, TestRumProvider),
    });

    expect(TEST_SET_USER).not.toHaveBeenCalled();
  });

  it('should set the user when provided', (): void => {
    renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        user: TEST_USER,
      },
      wrapper: TestRumProvider,
    });

    expect(TEST_SET_USER).toHaveBeenCalledTimes(ONCE);
    expect(TEST_SET_USER).toHaveBeenLastCalledWith(TEST_USER);
  });

  it('should remove the user on unmount', (): void => {
    const { unmount } = renderHook(useDatadog, {
      initialProps: {
        applicationId: 'test-application-id',
        clientToken: 'test-client-token',
        user: TEST_USER,
      },
      wrapper: TestRumProvider,
    });

    unmount();

    expect(TEST_REMOVE_USER).toHaveBeenCalledTimes(ONCE);
  });
});
