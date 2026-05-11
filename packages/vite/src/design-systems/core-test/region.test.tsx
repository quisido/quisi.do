import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const {
  Complementary,
  Document,
  Link,
  Main,
  Navigation,
  Region,
  Search,
} = await importTestedDesignSystem();

describe('Region', (): void => {
  it('should expose a named region landmark for important content', (): void => {
    const { getByName, getRoleCount } = render(
      <Region heading="Service health">All systems operational.</Region>,
    );

    const region: HTMLElement = getByName('region', 'Service health');
    expect(region.tagName).toBe('SECTION');
    expect(region).toHaveTextContent('All systems operational.');
    expect(getRoleCount('region')).toBe(1);
  });

  it('should use its visible heading as the accessible name', (): void => {
    const { getByName, getHeadingByLevel } = render(
      <Region heading="Release notes">Version details</Region>,
    );

    const region: HTMLElement = getByName('region', 'Release notes');
    const heading: HTMLElement = getHeadingByLevel('Release notes', 1);

    expect(region).toHaveAttribute('aria-labelledby', heading.id);
    expect(region).not.toHaveAttribute('aria-label');
    expect(region).toContainElement(heading);
  });

  it('should allow multiple regions when each has a distinct purpose label', (): void => {
    const { getByName, getRoleCount } = render(
      <>
        <Region heading="Account security">Security content</Region>
        <Region heading="Billing summary">Billing content</Region>
      </>,
    );

    expect(getByName('region', 'Account security')).toHaveTextContent(
      'Security content',
    );
    expect(getByName('region', 'Billing summary')).toHaveTextContent(
      'Billing content',
    );
    expect(getRoleCount('region')).toBe(2);
  });

  it('should not replace more specific landmark roles', (): void => {
    const { getRoleCount } = render(
      <Document>
        <Main>Main content</Main>
        <Complementary>Related content</Complementary>
        <Navigation label="Document navigation">
          <Link href="/contents">Contents</Link>
        </Navigation>
        <Search>Search controls</Search>
        <Region heading="Feature support matrix">Matrix content</Region>
      </Document>,
    );

    expect(getRoleCount('main')).toBe(1);
    expect(getRoleCount('complementary')).toBe(1);
    expect(getRoleCount('navigation')).toBe(1);
    expect(getRoleCount('search')).toBe(1);
    expect(getRoleCount('region')).toBe(1);
  });

  describe('heading', (): void => {
    it('should default to level 1', (): void => {
      const { getHeadingByLevel } = render(
        <Region heading="Default heading">Content</Region>,
      );
      getHeadingByLevel('Default heading', 1);
    });

    it('should increment levels for children but not siblings', (): void => {
      const { getHeadingByLevel } = render(
        <Region heading="Parent">
          <Region heading="Brother">
            <Region heading="Niece">
              <Region heading="Cousin">Test content</Region>
            </Region>
          </Region>
          <Region heading="Sister">
            <Region heading="Nephew">Test content</Region>
          </Region>
        </Region>,
      );
      getHeadingByLevel('Brother', 2);
      getHeadingByLevel('Sister', 2);
      getHeadingByLevel('Nephew', 3);
      getHeadingByLevel('Niece', 3);
      getHeadingByLevel('Cousin', 4);
    });

    it('should support levels >6', (): void => {
      const { getHeadingByLevel } = render(
        <Region heading="First">
          <Region heading="Second">
            <Region heading="Third">
              <Region heading="Fourth">
                <Region heading="Fifth">
                  <Region heading="Sixth">
                    <Region heading="Seventh">Test content</Region>
                  </Region>
                </Region>
              </Region>
            </Region>
          </Region>
        </Region>,
      );
      getHeadingByLevel('First', 1);
      getHeadingByLevel('Second', 2);
      getHeadingByLevel('Third', 3);
      getHeadingByLevel('Fourth', 4);
      getHeadingByLevel('Fifth', 5);
      getHeadingByLevel('Sixth', 6);
      getHeadingByLevel('Seventh', 7);
    });
  });
});
