import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Article, ContentInfo, Document, Link, SectionFooter } =
  await importTestedDesignSystem();

describe('SectionFooter', (): void => {
  it('should expose a section footer role without becoming content info', (): void => {
    const { getByRole, getRoleCount } = render(
      <SectionFooter>Article colophon</SectionFooter>,
    );

    const sectionFooter: HTMLElement = getByRole('sectionfooter');
    expect(sectionFooter.tagName).toBe('FOOTER');
    expect(sectionFooter).toHaveTextContent('Article colophon');
    expect(getRoleCount('contentinfo')).toBe(0);
  });

  it('should represent information about its closest ancestral content group', (): void => {
    const { getByName, getByRole } = render(
      <Article heading="Release notes">
        <p>Version details</p>
        <SectionFooter>Written by the platform team</SectionFooter>
      </Article>,
    );

    const article: HTMLElement = getByName('article', 'Release notes');
    const sectionFooter: HTMLElement = getByRole('sectionfooter');
    expect(article).toContainElement(sectionFooter);
    expect(sectionFooter).toHaveTextContent('Written by the platform team');
  });

  it('should support section-specific links and indices', (): void => {
    const { getByName, getByRole } = render(
      <SectionFooter>
        <span>Section copyright 2026</span>
        <Link href="/release-notes/sources">Sources</Link>
      </SectionFooter>,
    );

    const sectionFooter: HTMLElement = getByRole('sectionfooter');
    const link: HTMLElement = getByName('link', 'Sources');
    expect(sectionFooter).toContainElement(link);
    expect(link).toHaveAttribute('href', '/release-notes/sources');
    expect(sectionFooter).toHaveTextContent('Section copyright 2026');
  });

  it('should remain distinct from document-level content info', (): void => {
    const { getByName, getByRole, getRoleCount } = render(
      <Document>
        <Article heading="Case study">
          <p>Case study body</p>
          <SectionFooter>Case study author and sources</SectionFooter>
        </Article>
        <ContentInfo>Site-wide copyright and policies</ContentInfo>
      </Document>,
    );

    const article: HTMLElement = getByName('article', 'Case study');
    const sectionFooter: HTMLElement = getByRole('sectionfooter');
    const contentInfo: HTMLElement = getByRole('contentinfo');
    expect(article).toContainElement(sectionFooter);
    expect(sectionFooter).toHaveTextContent('Case study author and sources');
    expect(contentInfo).toHaveTextContent('Site-wide copyright and policies');
    expect(sectionFooter).not.toBe(contentInfo);
    expect(getRoleCount('sectionfooter')).toBe(1);
    expect(getRoleCount('contentinfo')).toBe(1);
  });
});
