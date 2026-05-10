import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Tooltip } = await importTestedDesignSystem();

describe('Tooltip', (): void => {
  it('should describe an element', (): void => {
    const { getByDescription } = render(
      <>
        <button id="test-tooltip-for-id">Test button</button>
        <Tooltip htmlFor="test-tooltip-for-id">Test tooltip</Tooltip>
      </>,
    );
    getByDescription('button', 'Test tooltip');
  });

  it('should throw when not describing an element', (): void => {
    const { expectToHaveThrown } = render(
      <Tooltip htmlFor="non-existent-id">Test tooltip</Tooltip>,
    );
    expectToHaveThrown('A tooltip must describe an element.');
  });
});
