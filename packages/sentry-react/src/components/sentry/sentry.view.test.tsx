import { render } from '@testing-library/react';
import Sentry from '../..';
import CustomErrorBoundaryFallback from '../../test/components/custom-error-boundary-fallback';
import ThrowError from '../../test/components/throw-error';

describe('Sentry', (): void => {
  it('should render children', (): void => {
    const { getByText } = render(
      <Sentry errorBoundaryDialogOptions={{}} showErrorBoundaryDialog>
        Hello world
      </Sentry>,
    );
    getByText('Hello world');
  });

  describe('error boundary', (): void => {
    // Disable console.error, because the thrown error is expected to be logged.
    const consoleError = console.error;
    beforeEach((): void => {
      console.error = jest.fn();
    });

    afterEach((): void => {
      console.error = consoleError;
    });

    it('should support a custom error boundary fallback', (): void => {
      const { getByText } = render(
        <Sentry ErrorBoundaryFallback={CustomErrorBoundaryFallback}>
          <ThrowError />
        </Sentry>,
      );
      getByText('test error message');
    });
  });
});
