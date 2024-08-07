import { render } from '@testing-library/react';
import { assert, describe, expect, it, vi } from 'vitest';
import MockNextRouter from '../index.js';
import createAppRouterConsumer from '../test/create-app-router-consumer.js';

const TEST_PREFETCH = vi.fn();

describe('MockAppRouter', (): void => {
  it('should provider a mocked app router', (): void => {
    const { appRouter, Consumer } = createAppRouterConsumer();

    const { unmount } = render(
      <MockNextRouter>
        <Consumer />
      </MockNextRouter>,
    );

    expect(appRouter.current).not.toBeNull();

    // Unlisten to the router.
    unmount();
  });

  it('should provide a mocked prefetch', (): void => {
    const { appRouter, Consumer } = createAppRouterConsumer();

    const { unmount } = render(
      <MockNextRouter prefetch={TEST_PREFETCH}>
        <Consumer />
      </MockNextRouter>,
    );

    assert(appRouter.current !== null);
    appRouter.current.prefetch('/test-href');

    expect(TEST_PREFETCH).toHaveBeenCalledOnce();
    expect(TEST_PREFETCH).toHaveBeenLastCalledWith('/test-href');

    // Unlisten to the router.
    unmount();
  });
});
