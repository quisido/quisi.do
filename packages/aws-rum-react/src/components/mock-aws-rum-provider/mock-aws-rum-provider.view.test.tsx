/// <reference types="jest" />
import { render, renderHook } from '@testing-library/react';
import { AwsRum } from 'aws-rum-web';
import type { PropsWithChildren, ReactElement } from 'react';
import { MockAwsRumProvider, useAwsRum } from '../../index.js';

describe('MockAwsRumProvider', (): void => {
  it('should not require props', (): void => {
    render(<MockAwsRumProvider>Hello world</MockAwsRumProvider>);
  });

  it('should provide an instance of AwsRum', (): void => {
    const { result } = renderHook(useAwsRum, {
      wrapper({ children }: PropsWithChildren): ReactElement {
        return <MockAwsRumProvider>{children}</MockAwsRumProvider>;
      },
    });

    expect(result.current).toBeInstanceOf(AwsRum);
  });
});
