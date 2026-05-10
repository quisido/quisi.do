import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

// Note: The image role in ARIA 1.3 is `image` instead of `img`.

const { Image } = await importTestedDesignSystem();

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
