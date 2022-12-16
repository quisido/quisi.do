/// <reference types="jest" />
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { useEffect } from 'react';
import { withRecordError } from '..';
import { TestAwsRumProvider } from '../jest';

interface TestProps {
  readonly recordError: (error: unknown) => void;
}

const ONCE = 1;
const TEST_RECORD_ERROR = jest.fn<unknown, [unknown]>();

function TestComponent({ recordError }: TestProps): null {
  useEffect((): void => {
    recordError('test error');
  }, [recordError]);

  return null;
}

const TestHoc = withRecordError(TestComponent);

describe('withRecordError', (): void => {
  it('should provide a `recordError` prop', (): void => {
    render(<TestHoc />, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <TestAwsRumProvider recordError={TEST_RECORD_ERROR}>
            {children}
          </TestAwsRumProvider>
        );
      },
    });

    expect(TEST_RECORD_ERROR).toHaveBeenCalledTimes(ONCE);
    expect(TEST_RECORD_ERROR).toHaveBeenLastCalledWith('test error');
  });
});
