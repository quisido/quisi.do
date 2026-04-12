import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { BannerProps } from '../core/banner-props.js';
import type { DocumentProps } from '../core/document-props.js';
import render from './render.js';

interface Options {
  readonly Document: ComponentType<DocumentProps>;
}

export default function testBanner(
  Banner: ComponentType<BannerProps>,
  { Document }: Options,
): void {
  describe('Banner', (): void => {
    it('should be a banner', (): void => {
      const { getByName } = render(
        <Document>
          <Banner label="Test banner">Test content</Banner>
        </Document>,
      );

      getByName('banner', 'Test banner');
    });
  });
}
