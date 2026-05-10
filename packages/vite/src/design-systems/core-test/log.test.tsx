import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Log } = await importTestedDesignSystem();

describe('Log', (): void => {
  it('should be a log', (): void => {
    const { getByRole } = render(<Log>Test content</Log>);

    const log: HTMLElement = getByRole('log');
    expect(log).toHaveTextContent('Test content');
  });
});
