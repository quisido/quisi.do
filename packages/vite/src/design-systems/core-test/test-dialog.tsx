import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { DialogProps } from '../core/dialog-props.js';

export default function testDialog(Dialog: ComponentType<DialogProps>): void {
  describe('Dialog', (): void => {
    it('should support a heading', (): void => {
      const { getByRole } = render(
        <Dialog description="Test description" heading="Test heading">
          Test content
        </Dialog>,
      );

      getByRole('dialog', { name: 'Test heading' });
    });

    it('should support a label', (): void => {
      const { getByRole } = render(
        <Dialog description="Test description" label="Test label">
          Test content
        </Dialog>,
      );

      getByRole('dialog', { name: 'Test label' });
    });

    it('should support an external label', (): void => {
      const { getByRole } = render(
        <>
          <span id="test-id">Test labelled by</span>
          <Dialog description="Test description" labelledBy="test-id">
            Test content
          </Dialog>
        </>,
      );

      getByRole('dialog', { name: 'Test labelled by' });
    });
  });
}
