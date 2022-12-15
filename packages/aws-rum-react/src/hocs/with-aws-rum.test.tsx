import { render } from '@testing-library/react';
import { AwsRum } from 'aws-rum-web';
import type { PropsWithChildren, ReactElement } from 'react';
import { AwsRumProvider, withAwsRum } from '..';

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
          <AwsRumProvider id="test-id" region="us-east-1" version="1.0.0">
            {children}
          </AwsRumProvider>
        );
      },
    });

    getByText('Yes');
  });
});
