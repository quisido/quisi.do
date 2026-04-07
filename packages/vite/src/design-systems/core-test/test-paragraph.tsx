import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ParagraphProps } from '../core/paragraph-props.js';

export default function testParagraph(
  Paragraph: ComponentType<ParagraphProps>,
): void {
  describe('Paragraph', (): void => {
    it('should be a paragraph', (): void => {
      const { getByRole } = render(<Paragraph>Test paragraph</Paragraph>);
      expect(getByRole('paragraph').textContent).toBe('Test paragraph');
    });
  });
}
