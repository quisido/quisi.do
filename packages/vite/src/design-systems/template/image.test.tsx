import { describe, it } from 'vitest';
import { Image } from './index.js';
import { render } from '@testing-library/react';

describe('Image', (): void => {
  it('should be an image', (): void => {
    const { getByRole } = render(<Image name="Test image" src="" />);
    getByRole('img', { name: 'Test image' });
  });
});
