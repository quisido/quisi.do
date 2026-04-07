import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import type { AlertProps } from '../core/alert-props.js';

export default function testAlert(Alert: ComponentType<AlertProps>): void {
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
}
