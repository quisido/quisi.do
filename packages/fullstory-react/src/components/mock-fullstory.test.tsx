import { FullStory } from '@fullstory/browser';
import { renderHook } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MockFullstory, useFullstory } from '../index.js';

describe('MockFullstory', (): void => {
  it.each(['FullStory', 'Fullstory'] as const)(
    'forwards API calls to the provided %s export',
    (exportName): void => {
      const fullstory = Object.assign(vi.fn(), FullStory);
      const Wrapper = ({ children }: PropsWithChildren): ReactElement => (
        <MockFullstory orgId="test-org-id" {...{ [exportName]: fullstory }}>
          {children}
        </MockFullstory>
      );
      const { result } = renderHook(useFullstory, { wrapper: Wrapper });

      result.current('trackEvent', { name: 'test-event' });

      expect(fullstory).toHaveBeenCalledWith('trackEvent', {
        name: 'test-event',
      });
    },
  );
});
