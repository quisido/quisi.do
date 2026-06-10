import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import Sentry from './sentry.js';

interface SentryReactProps {
  readonly children: ReactNode;
  readonly dataCollection?: unknown;
}

const TEST_CHILDREN = 'test children';
const TEST_DSN = 'test-dsn';
const TEST_ENVIRONMENT = 'test-environment';
const TEST_INTEGRATIONS: readonly unknown[] = [];
const TEST_RELEASE = 'test-release';
const TEST_SENTRY_REACT = vi.hoisted(() =>
  vi.fn(({ children }: SentryReactProps): ReactNode => children),
);
const TEST_TRACE_PROPAGATION_TARGETS: string[] = ['test.example.com'];

vi.mock('sentry-react', () => ({
  default: TEST_SENTRY_REACT,
}));

vi.mock('../hooks/use-sentry-integrations.js', () => ({
  default: (): readonly unknown[] => TEST_INTEGRATIONS,
}));

describe('Sentry', (): void => {
  it('should pass explicit data collection options to Sentry', (): void => {
    render(
      <Sentry
        dsn={TEST_DSN}
        environment={TEST_ENVIRONMENT}
        release={TEST_RELEASE}
        tracePropagationTargets={TEST_TRACE_PROPAGATION_TARGETS}
      >
        {TEST_CHILDREN}
      </Sentry>,
    );

    expect(TEST_SENTRY_REACT).toHaveBeenCalledOnce();
    expect(TEST_SENTRY_REACT).toHaveBeenLastCalledWith(
      expect.objectContaining({
        dataCollection: {
          cookies: true,
          frameContextLines: 7,
          genAI: {
            inputs: true,
            outputs: true,
          },
          httpBodies: [
            'incomingRequest',
            'outgoingRequest',
            'incomingResponse',
            'outgoingResponse',
          ],
          httpHeaders: {
            request: true,
            response: true,
          },
          queryParams: true,
          stackFrameVariables: true,
          userInfo: true,
        },
      }),
      undefined,
    );
    expect(TEST_SENTRY_REACT.mock.lastCall?.[0]).not.toHaveProperty(
      'sendDefaultPii',
    );
  });
});
