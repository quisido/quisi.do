import { describe, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Dialog } = await importTestedDesignSystem();

describe('Dialog', (): void => {
  it('should support a heading', (): void => {
    const { getByName } = render(
      <Dialog description="Test description" heading="Test heading">
        Test content
      </Dialog>,
    );

    getByName('dialog', 'Test heading');
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

  //  * Dialogs must have at least one focusable descendant element.
});
