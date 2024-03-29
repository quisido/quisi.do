/// <reference types="jest" />
import { renderHook } from '@testing-library/react';
import { AwsRum } from 'aws-rum-web';
import type { PropsWithChildren, ReactElement } from 'react';
import { AwsRumProvider, useAwsRum } from '../../index.js';

describe('AwsRumProvider', (): void => {
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
