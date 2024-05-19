import { FullStory } from '@fullstory/browser';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MockFullstory } from '../index.js';

const ONCE = 1;
const TEST_FULLSTORY = Object.assign(vi.fn(), FullStory);
const TEST_INIT = vi.fn();
const TEST_IS_INITIALIZED = vi.fn();

describe('Fullstory', (): void => {
  beforeEach((): void => {
    TEST_IS_INITIALIZED.mockReturnValue(false);
    TEST_INIT.mockImplementation((): void => {
      TEST_IS_INITIALIZED.mockReturnValue(true);
    });
  });

  it('should init', (): void => {
    render(
      <MockFullstory
        FullStory={TEST_FULLSTORY}
        init={TEST_INIT}
        isInitialized={TEST_IS_INITIALIZED}
        orgId="test-org-id"
      />
    );

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
    expect(TEST_INIT).toHaveBeenLastCalledWith({
      orgId: 'test-org-id',
    });
  });

  it('should not init on re-render', (): void => {
    const { rerender } = render(
      <MockFullstory
        FullStory={TEST_FULLSTORY}
        init={TEST_INIT}
        isInitialized={TEST_IS_INITIALIZED}
        orgId="test-org-id"
      />
    );

    // Re-render
    rerender(
      <MockFullstory
        FullStory={TEST_FULLSTORY}
        init={TEST_INIT}
        isInitialized={TEST_IS_INITIALIZED}
        orgId="test-org-id"
      />
    );

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
  });

  it('should not init twice', (): void => {
    render(
      <MockFullstory
        FullStory={TEST_FULLSTORY}
        init={TEST_INIT}
        isInitialized={TEST_IS_INITIALIZED}
        orgId="test-org-id"
      />
    );

    render(
      <MockFullstory
        FullStory={TEST_FULLSTORY}
        init={TEST_INIT}
        isInitialized={TEST_IS_INITIALIZED}
        orgId="test-org-id"
      />
    );

    expect(TEST_INIT).toHaveBeenCalledTimes(ONCE);
  });
});
