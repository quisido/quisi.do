import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Heading } = await importTestedDesignSystem();

describe('Heading', (): void => {
  it.each([1, 2, 3, 4, 5, 6, 7])(
    'should support level %i',
    (level: number): void => {
      const { getHeadingByLevel } = render(<Heading>Test</Heading>);
      getHeadingByLevel('Test', level);
    },
  );
});
