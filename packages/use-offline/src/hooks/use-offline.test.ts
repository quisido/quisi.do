/// <reference types="jest" />
import { act, renderHook } from '@testing-library/react';
import useOffline from '..';

describe('useOffline', (): void => {
  it('should default to false', (): void => {
    const { result } = renderHook(useOffline);
    expect(result.current).toBe(false);
  });

  it('should listen to online and offline events on mount', (): void => {
    const windowAddEventListener: jest.SpyInstance<void> = jest.spyOn(
      window,
      'addEventListener',
    );
    expect(windowAddEventListener).not.toHaveBeenCalledWith(
      'online',
      expect.any(Function),
    );
    expect(windowAddEventListener).not.toHaveBeenCalledWith(
      'offline',
      expect.any(Function),
    );

    renderHook(useOffline);

    expect(windowAddEventListener).toHaveBeenCalledWith(
      'online',
      expect.any(Function),
    );
    expect(windowAddEventListener).toHaveBeenCalledWith(
      'offline',
      expect.any(Function),
    );
  });

  it('should respond to offline events', (): void => {
    const { result } = renderHook(useOffline);
    act((): void => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(true);
  });

  it('should respond to online events', (): void => {
    const { result } = renderHook(useOffline);
    act((): void => {
      window.dispatchEvent(new Event('offline'));
    });
    act((): void => {
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current).toBe(false);
  });

  it('should stop listening to online and offline events on unmount', (): void => {
    const windowRemoveEventListener: jest.SpyInstance<void> = jest.spyOn(
      window,
      'removeEventListener',
    );
    expect(windowRemoveEventListener).not.toHaveBeenCalledWith(
      'online',
      expect.any(Function),
    );
    expect(windowRemoveEventListener).not.toHaveBeenCalledWith(
      'offline',
      expect.any(Function),
    );

    const { unmount } = renderHook(useOffline);
    unmount();

    expect(windowRemoveEventListener).toHaveBeenCalledWith(
      'online',
      expect.any(Function),
    );
    expect(windowRemoveEventListener).toHaveBeenCalledWith(
      'offline',
      expect.any(Function),
    );
  });
});
