import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { DialogProps } from '../core/dialog-props.js';
import render from './render.js';

export default function testDialog(Dialog: ComponentType<DialogProps>): void {
  describe('Dialog', (): void => {
    it('should support a heading', (): void => {
      const { getByName } = render(
        <Dialog description="Test description" heading="Test heading">
          Test content
        </Dialog>,
      );

      getByName('dialog', 'Test heading');
    });

    it('should support a label', (): void => {
      const { getByName } = render(
        <Dialog description="Test description" label="Test label">
          Test content
        </Dialog>,
      );

      getByName('dialog', 'Test label');
    });

    it('should support an external label', (): void => {
      const { getByName } = render(
        <>
          <span id="test-dialog-label-id">Test labelled by</span>
          <Dialog
            description="Test description"
            labelledBy="test-dialog-label-id"
          >
            Test content
          </Dialog>
        </>,
      );

      getByName('dialog', 'Test labelled by');
    });

    //  *   Dialogs must have at least one focusable descendant element.
  });
}
