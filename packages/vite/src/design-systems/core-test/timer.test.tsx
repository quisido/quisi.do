import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Timer } = await importTestedDesignSystem();

describe('Timer', (): void => {
  it('should be a timer', (): void => {
    const { getByRole } = render(<Timer>00:00</Timer>);
    expect(getByRole('timer')).toHaveTextContent('00:00');
  });
});
