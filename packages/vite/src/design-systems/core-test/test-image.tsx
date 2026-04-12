import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ImageProps } from '../core/image-props.js';

export default function testImage(Image: ComponentType<ImageProps>): void {
  describe('Image', (): void => {
    it('should be an image', (): void => {
      const { getByName } = render(
        <Image name="Test image" src="file://test.png" />,
      );
      getByName('img', 'Test image');
    });
  });
}
