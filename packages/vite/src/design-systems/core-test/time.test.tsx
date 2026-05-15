import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Time } = await importTestedDesignSystem();

describe('Time', (): void => {
  it('should be a time', (): void => {
    const { getByRole } = render(<Time>2003-02-01</Time>);
    getByRole('time');
  });
});
