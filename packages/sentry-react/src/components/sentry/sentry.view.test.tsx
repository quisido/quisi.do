import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, it } from 'vitest';
import CustomErrorBoundaryFallback from '../../../test/custom-error-boundary-fallback.js';
import ThrowError from '../../../test/throw-error.js';
import Sentry from '../../index.js';
import {
  mockConsoleError,
  restoreConsoleError,
} from '../../../test/console-error.js';

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
    beforeEach(mockConsoleError);
    afterEach(restoreConsoleError);

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
