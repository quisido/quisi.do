import { describe, it } from 'vitest';
import type { ComponentType } from 'react';
import type { AlertProps } from '../core/alert-props.js';
import render from './render.js';

export default function testAlert(Alert: ComponentType<AlertProps>): void {
  describe('Alert', (): void => {
    it('should support headings', (): void => {
      const { getByName } = render(
        <Alert heading="Test heading" type="info">
          Test alert
        </Alert>,
      );
      getByName('alert', 'Test heading');
    });

    it('should support labels', (): void => {
      const { getByName } = render(
        <Alert label="Test label" type="info">
          Test alert
        </Alert>,
      );
      getByName('alert', 'Test label');
    });

    it('should support labelled by', (): void => {
      const { getByName } = render(
        <>
          <span id="test-alert-label-id">Test labelled by</span>
          <Alert labelledBy="test-alert-label-id" type="info">
            Test alert
          </Alert>
        </>,
      );
      getByName('alert', 'Test labelled by');
    });
  });
}
