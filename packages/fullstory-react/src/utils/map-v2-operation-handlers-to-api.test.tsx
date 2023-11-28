import { FullStory } from '@fullstory/browser';
import { act, renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { MockFullStory, useFullStory } from '../index.js';

const ONCE = 1;
const TEST_FULLSTORY = Object.assign(jest.fn(), FullStory);
const TEST_SHUTDOWN = jest.fn();

describe('mapV2OperationHandlersToApi', (): void => {
  it('should call a mocked FullStory API', (): void => {
    const { result } = renderHook(useFullStory, {
      initialProps: {
        orgId: 'my-org-id',
      },
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <MockFullStory FullStory={TEST_FULLSTORY}>{children}</MockFullStory>
        );
      },
    });

    act((): void => {
      result.current('shutdown');
    });

    expect(TEST_FULLSTORY).toHaveBeenCalledTimes(ONCE);
    expect(TEST_FULLSTORY).toHaveBeenLastCalledWith(
      'shutdown',
      undefined,
      undefined,
    );
  });

  it('should return a mocked FullStory API', (): void => {
    const { result } = renderHook(useFullStory, {
      initialProps: {
        orgId: 'my-org-id',
      },
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <MockFullStory onShutdown={TEST_SHUTDOWN}>{children}</MockFullStory>
        );
      },
    });

    act((): void => {
      result.current('shutdown');
    });

    expect(TEST_SHUTDOWN).toHaveBeenCalledTimes(ONCE);
  });
});
