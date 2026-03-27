/* eslint-disable no-magic-numbers */
import { describe, it } from 'vitest';
import { Heading } from './index.js';
import { render } from '@testing-library/react';

describe('Heading', (): void => {
  it.each([1, 2, 3, 4, 5, 6, 7])(
    'should support level %i',
    (level: number): void => {
      const { getByRole } = render(<Heading level={level}>Test</Heading>);
      getByRole('heading', { level, name: 'Test' });
    },
  );
});
