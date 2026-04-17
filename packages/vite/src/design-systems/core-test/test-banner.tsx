import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
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
      const { getByRole } = render(
        <Document>
          <Banner>Test content</Banner>
        </Document>,
      );

      expect(getByRole('banner')).toHaveTextContent('Test content');
    });
  });
}
