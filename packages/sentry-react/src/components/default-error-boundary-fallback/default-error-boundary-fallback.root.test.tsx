import { render } from '@testing-library/react';
import DefaultErrorBoundaryFallback from '.';

describe('DefaultErrorBoundaryFallback', (): void => {
  it('should render the error message', (): void => {
    const { getByText } = render(
      <DefaultErrorBoundaryFallback
        error={new Error('test message')}
        resetError={jest.fn()}
      />,
    );
    getByText('test message');
  });
});
