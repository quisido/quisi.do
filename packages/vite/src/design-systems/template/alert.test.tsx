import { describe, it } from 'vitest';
import { Alert } from './index.js';
import { render } from '@testing-library/react';

describe('Alert', (): void => {
  it('should support headings', (): void => {
    const { getByRole } = render(
      <Alert heading="Test heading" type="info">
        Test alert
      </Alert>,
    );
    getByRole('alert', { name: 'Test heading' });
  });

  it('should support labels', (): void => {
    const { getByRole } = render(
      <Alert label="Test label" type="info">
        Test alert
      </Alert>,
    );
    getByRole('alert', { name: 'Test label' });
  });

  it('should support labelled by', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test labelled by</span>
        <Alert labelledBy="test-id" type="info">
          Test alert
        </Alert>
        ,
      </>,
    );
    getByRole('alert', { name: 'Test labelled by' });
  });
});
