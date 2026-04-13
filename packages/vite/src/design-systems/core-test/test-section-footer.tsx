import render from './render.js';
import { type SectionFooterProps } from '../core/section-footer-props.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';

export default function testSectionFooter(
  SectionFooter: ComponentType<SectionFooterProps>,
): void {
  describe('SectionFooter', (): void => {
    it('should be a section footer', (): void => {
      const { getByRole } = render(<SectionFooter>Test content</SectionFooter>);
      const sectionFooter: HTMLElement = getByRole('sectionfooter');
      expect(sectionFooter.textContent).toBe('Test content');
    });
  });
}
