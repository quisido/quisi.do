import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ParagraphProps } from '../core/paragraph-props.js';
import render from './render.js';

export default function testParagraph(
  Paragraph: ComponentType<ParagraphProps>,
): void {
  describe('Paragraph', (): void => {
    it('should be a paragraph', (): void => {
      const { getByRole } = render(<Paragraph>Test paragraph</Paragraph>);
      const paragraph: HTMLElement = getByRole('paragraph');
      expect(paragraph.textContent).toBe('Test paragraph');
    });
  });
}
