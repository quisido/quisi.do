/* eslint-disable no-magic-numbers */
import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { HeadingProps } from '../core/heading-props.js';

export default function testHeading(
  Heading: ComponentType<HeadingProps>,
): void {
  describe('Heading', (): void => {
    it.each([1, 2, 3, 4, 5, 6, 7])(
      'should support level %i',
      (level: number): void => {
        const { getByRole } = render(<Heading level={level}>Test</Heading>);
        getByRole('heading', { level, name: 'Test' });
      },
    );
  });
}
