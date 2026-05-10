import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { SectionHeader } = await importTestedDesignSystem();

describe('SectionHeader', (): void => {
  it('should be a section header', (): void => {
    const { getByRole } = render(<SectionHeader>Test content</SectionHeader>);
    const sectionHeader: HTMLElement = getByRole('sectionheader');
    expect(sectionHeader).toHaveTextContent('Test content');
  });
});
