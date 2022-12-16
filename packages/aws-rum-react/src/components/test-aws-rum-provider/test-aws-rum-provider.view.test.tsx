/// <reference types="jest" />
import { render } from '@testing-library/react';
import { TestAwsRumProvider } from '../../jest';

describe('TestAwsRumProvider', (): void => {
  it('should not require props', (): void => {
    render(<TestAwsRumProvider>Hello world</TestAwsRumProvider>);
  });
});
