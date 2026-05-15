import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

// Note: The image role in ARIA 1.3 is `image` instead of `img`.

const { Image } = await importTestedDesignSystem();

describe('Image', (): void => {
  it('should support alt text', (): void => {
    const { getByAltText } = render(
      <Image alt="alternative text" src="file://test.png" />,
    );
    getByAltText('alternative text');
  });

  it('should support external labels', (): void => {
    const { getByName } = render(
      <>
        <span id="test-image-label-id">Labelled image</span>
        <Image
          alt="Image"
          labelledBy="test-image-label-id"
          src="file://test.png"
        />
      </>,
    );
    getByName('image', 'Labelled image');
  });
});
