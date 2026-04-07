import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { BannerProps } from '../core/banner-props.js';
import type { DocumentProps } from '../core/document-props.js';

interface Options {
  readonly Document: ComponentType<DocumentProps>;
}

export default function testBanner(
  Banner: ComponentType<BannerProps>,
  { Document }: Options,
): void {
  describe('Banner', (): void => {
    it('should be a banner', (): void => {
      const { getByRole } = render(
        <Banner label="Test banner">Test content</Banner>,
        { wrapper: Document },
      );

      getByRole('banner', { name: 'Test banner' });
    });
  });
}
