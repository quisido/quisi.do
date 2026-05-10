import { describe, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Mark } = await importTestedDesignSystem();

describe('Mark', (): void => {
  it('should mark text', (): void => {
    const { getByDescription } = render(
      <>
        <span id="test-mark-description-id">Test description</span>
        <Mark describedBy="test-mark-description-id">Test mark</Mark>
      </>,
    );
    getByDescription('mark', 'Test description');
  });
});
