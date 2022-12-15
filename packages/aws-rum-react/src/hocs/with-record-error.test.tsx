import { AwsRum } from 'aws-rum-web';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { useEffect } from 'react';
import { AwsRumProvider, withRecordError } from '..';

interface TestProps {
  readonly recordError: (error: unknown) => void;
}

const ONCE = 1;
const TEST_RECORD_ERROR = jest.fn<unknown, [unknown]>();

const AWS_RUM_PROTOTYPE_RECORD_ERROR: (error: unknown) => void =
  AwsRum.prototype.recordError.bind(AwsRum.prototype);

function TestComponent({ recordError }: TestProps): null {
  useEffect((): void => {
    recordError('test error');
  }, [recordError]);

  return null;
}

const TestHoc = withRecordError(TestComponent);

describe('withRecordError', (): void => {
  beforeEach((): void => {
    AwsRum.prototype.recordError = TEST_RECORD_ERROR;
  });

  afterEach((): void => {
    AwsRum.prototype.recordError = AWS_RUM_PROTOTYPE_RECORD_ERROR;
  });

  it('should provide a `recordError` prop', (): void => {
    render(<TestHoc />, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <AwsRumProvider id="test-id" region="us-east-1" version="0.0.0">
            {children}
          </AwsRumProvider>
        );
      },
    });

    expect(TEST_RECORD_ERROR).toHaveBeenCalledTimes(ONCE);
    expect(TEST_RECORD_ERROR).toHaveBeenLastCalledWith('test error');
  });
});
