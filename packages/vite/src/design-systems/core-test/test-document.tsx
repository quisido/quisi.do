import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { BannerProps } from '../core/banner-props.js';
import type { ContentInfoProps } from '../core/content-info-props.js';
import type { DocumentProps } from '../core/document-props.js';

interface Options {
  readonly Banner: ComponentType<BannerProps>;
  readonly ContentInfo: ComponentType<ContentInfoProps>;
}

export default function testDocument(
  Document: ComponentType<DocumentProps>,
  { Banner, ContentInfo }: Options,
): void {
  describe('Document', (): void => {
    it('should be a document', (): void => {
      const { getByRole } = render(<Document>Test content</Document>);
      expect(getByRole('document').textContent).toBe('Test content');
    });

    it('should render a banner', (): void => {
      const { getByRole } = render(
        <Document banner="Test banner">Test content</Document>,
      );

      expect(getByRole('banner').textContent).toBe('Test banner');
    });

    it('should not contain more than 1 banner', (): void => {
      expect((): void => {
        render(
          <Document banner="First banner">
            <Banner>Second banner</Banner>
          </Document>,
        );
      }).toThrow('An application or document cannot own multiple banners.');
    });

    it('should render content info', (): void => {
      const { getByRole } = render(
        <Document contentInfo="Test content info">Test content</Document>,
      );

      expect(getByRole('contentinfo').textContent).toBe('Test content info');
    });

    it('should not contain more than 1 content info', (): void => {
      expect((): void => {
        render(
          <Document contentInfo="First content info">
            <ContentInfo>Second content info</ContentInfo>
          </Document>,
        );
      }).toThrow(
        'An application or document cannot own multiple content info.',
      );
    });
  });
}
