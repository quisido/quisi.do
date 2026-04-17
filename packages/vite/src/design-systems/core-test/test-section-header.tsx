import render from './render.js';
import { type SectionHeaderProps } from '../core/section-header-props.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';

export default function testSectionHeader(
  SectionHeader: ComponentType<SectionHeaderProps>,
): void {
  describe('SectionHeader', (): void => {
    it('should be a section header', (): void => {
      const { getByRole } = render(<SectionHeader>Test content</SectionHeader>);
      const sectionHeader: HTMLElement = getByRole('sectionheader');
      expect(sectionHeader).toHaveTextContent('Test content');
    });
  });
}
