import render from './render.js';
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
        const { getHeadingByLevel } = render(
          <Heading level={level}>Test</Heading>,
        );
        getHeadingByLevel('Test', level);
      },
    );
  });
}
