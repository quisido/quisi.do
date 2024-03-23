/// <reference types="jest" />
import { render } from '@testing-library/react';
import { AwsRum } from 'aws-rum-web';
import type { PropsWithChildren, ReactElement } from 'react';
import { AwsRumProvider, withAwsRum } from '../index.js';

interface TestProps {
  readonly awsRum: AwsRum;
}

function TestComponent({ awsRum }: TestProps): ReactElement {
  return <>{awsRum instanceof AwsRum ? 'Yes' : 'No'}</>;
}

const TestHoc = withAwsRum(TestComponent);

describe('withAwsRum', (): void => {
  it('should provide an `awsRum` prop', (): void => {
    const { getByText } = render(<TestHoc />, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <AwsRumProvider
            eventPluginsToLoad={[]}
            fetchFunction={jest.fn()}
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

    getByText('Yes');
  });
});
