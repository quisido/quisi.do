import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ImageProps } from '../core/image-props.js';

// Note: The image role in ARIA 1.3 is `image` instead of `img`.

export default function testImage(Image: ComponentType<ImageProps>): void {
  describe('Image', (): void => {
    it('should support labels', (): void => {
      const { getByName } = render(
        <Image alt="Test image" src="file://test.png" />,
      );
      getByName('image', 'Test image label');
    });

    it('should support labelled by', (): void => {
      const { getByName } = render(
        <>
          <span id="test-image-label-id">Test image labelled by</span>
          <Image
            alt="Test image"
            labelledBy="test-image-label-id"
            src="file://test.png"
          />
        </>,
      );
      getByName('image', 'Test image labelled by');
    });
  });
}
