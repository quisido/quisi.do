import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Article, Document, SectionHeader } = await importTestedDesignSystem();

describe('SectionHeader', (): void => {
  it('should expose a section header role without becoming a banner', (): void => {
    const { getByRole, getRoleCount } = render(
      <SectionHeader>Release introduction</SectionHeader>,
    );

    const sectionHeader: HTMLElement = getByRole('sectionheader');
    expect(sectionHeader.tagName).toBe('HEADER');
    expect(sectionHeader).toHaveTextContent('Release introduction');
    expect(getRoleCount('banner')).toBe(0);
  });

  it('should represent introductory content for its closest ancestral content group', (): void => {
    const { getByName, getByRole } = render(
      <Article heading="Release notes">
        <SectionHeader>
          <h2>Highlights</h2>
          <p>Important changes in this release.</p>
        </SectionHeader>
        <p>Release details</p>
      </Article>,
    );

    const article: HTMLElement = getByName('article', 'Release notes');
    const sectionHeader: HTMLElement = getByRole('sectionheader');
    expect(article).toContainElement(sectionHeader);
    expect(sectionHeader).toHaveTextContent('Highlights');
    expect(sectionHeader).toHaveTextContent('Important changes in this release.');
  });

  it('should support section-specific headings and metadata', (): void => {
    const { getByRole, getHeadingByLevel } = render(
      <SectionHeader>
        <h2>Security updates</h2>
        <p>Introductory statement for this section.</p>
        <span>Reviewed May 2026</span>
      </SectionHeader>,
    );

    const sectionHeader: HTMLElement = getByRole('sectionheader');
    const heading: HTMLElement = getHeadingByLevel('Security updates', 2);
    expect(sectionHeader).toContainElement(heading);
    expect(sectionHeader).toHaveTextContent(
      'Introductory statement for this section.',
    );
    expect(sectionHeader).toHaveTextContent('Reviewed May 2026');
  });

  it('should remain distinct from site-oriented banner content', (): void => {
    const { getByName, getByRole, getRoleCount } = render(
      <Document banner="Global site header">
        <Article heading="Case study">
          <SectionHeader>Case study summary and metadata</SectionHeader>
          <p>Case study body</p>
        </Article>
      </Document>,
    );

    const article: HTMLElement = getByName('article', 'Case study');
    const sectionHeader: HTMLElement = getByRole('sectionheader');
    const banner: HTMLElement = getByRole('banner');
    expect(article).toContainElement(sectionHeader);
    expect(sectionHeader).toHaveTextContent('Case study summary and metadata');
    expect(banner).toHaveTextContent('Global site header');
    expect(sectionHeader).not.toBe(banner);
    expect(getRoleCount('sectionheader')).toBe(1);
    expect(getRoleCount('banner')).toBe(1);
  });
});
