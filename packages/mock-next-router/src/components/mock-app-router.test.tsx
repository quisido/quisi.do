import { render } from '@testing-library/react';
import { assert, describe, expect, it, vi } from 'vitest';
import MockNextRouter from '../index.js';
import createAppRouterConsumer from '../test/utils/create-app-router-consumer.js';

const ONCE = 1;
const TEST_PREFETCH = vi.fn();

describe('MockAppRouter', (): void => {
  it('should provider a mocked app router', (): void => {
    const { appRouter, Consumer } = createAppRouterConsumer();

    render(
      <MockNextRouter>
        <Consumer />
      </MockNextRouter>,
    );

    expect(appRouter.current).not.toBeNull();
  });

  it('should provide a mocked prefetch', (): void => {
    const { appRouter, Consumer } = createAppRouterConsumer();

    render(
      <MockNextRouter prefetch={TEST_PREFETCH}>
        <Consumer />
      </MockNextRouter>,
    );

    assert(appRouter.current !== null);
    appRouter.current.prefetch('/test-href');

    expect(TEST_PREFETCH).toHaveBeenCalledTimes(ONCE);
    expect(TEST_PREFETCH).toHaveBeenLastCalledWith('/test-href');
  });
});
