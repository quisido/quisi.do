import { render } from '@testing-library/react';
import { AwsRum } from 'aws-rum-web';
import type { PropsWithChildren, ReactElement } from 'react';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { AwsRumProvider, withAwsRum } from '../index.js';

interface TestProps {
  readonly awsRum: AwsRum;
}

function TestComponent({ awsRum }: TestProps): ReactElement {
  return <>{(awsRum instanceof AwsRum).toString()}</>;
}

const TestHoc = withAwsRum(TestComponent);
const WINDOW_FETCH = window.fetch;

describe('withAwsRum', (): void => {
  beforeEach((): void => {
    window.fetch = vi.fn();
  });

  afterEach((): void => {
    window.fetch = WINDOW_FETCH;
  });

  it('should provide an `awsRum` prop', (): void => {
    const { getByText } = render(<TestHoc />, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <AwsRumProvider
            eventPluginsToLoad={[]}
            fetchFunction={vi.fn()}
            id="test-id"
            region="us-east-1"
            telemetries={[]}
            version="0.0.0"
          >
            {children}
          </AwsRumProvider>
        );
      },
    });

    getByText('true');
  });
});
