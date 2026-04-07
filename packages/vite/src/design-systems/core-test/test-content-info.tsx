import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ContentInfoProps } from '../core/content-info-props.js';
import type { DocumentProps } from '../core/document-props.js';

interface Options {
  readonly Document: ComponentType<DocumentProps>;
}

export default function testContentInfo(
  ContentInfo: ComponentType<ContentInfoProps>,
  { Document }: Options,
): void {
  describe('ContentInfo', (): void => {
    it('should be content info', (): void => {
      const { getByRole } = render(<ContentInfo>Test content</ContentInfo>, {
        wrapper: Document,
      });

      expect(getByRole('contentinfo').textContent).toBe('Test content');
    });
  });
}
