import { renderHook } from '@testing-library/react';
import { AwsRum } from 'aws-rum-web';
import { PropsWithChildren, ReactElement } from 'react';
import { AwsRumProvider, useAwsRum } from '../..';

describe('aws-rum-react', (): void => {
  it('should provide AwsRum via a hook', (): void => {
    const { result } = renderHook(useAwsRum, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return (
          <AwsRumProvider
            id="test-id"
            region="us-east-1"
            version="test-version"
          >
            {children}
          </AwsRumProvider>
        );
      },
    });

    expect(result.current).toBeInstanceOf(AwsRum);
  });
});
