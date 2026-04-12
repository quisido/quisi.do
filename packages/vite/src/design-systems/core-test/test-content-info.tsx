import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ContentInfoProps } from '../core/content-info-props.js';
import type { DocumentProps } from '../core/document-props.js';
import render from './render.js';

interface Options {
  readonly Document: ComponentType<DocumentProps>;
}

export default function testContentInfo(
  ContentInfo: ComponentType<ContentInfoProps>,
  { Document }: Options,
): void {
  describe('ContentInfo', (): void => {
    it('should be content info', (): void => {
      const { getByRole } = render(
        <Document>
          <ContentInfo>Test content</ContentInfo>
        </Document>,
      );

      const contentInfo: HTMLElement = getByRole('contentinfo');
      expect(contentInfo.textContent).toBe('Test content');
    });
  });
}
