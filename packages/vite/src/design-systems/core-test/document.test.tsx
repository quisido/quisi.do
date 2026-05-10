import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Document, Banner, ContentInfo } = await importTestedDesignSystem();

describe('Document', (): void => {
  it('should be a document', (): void => {
    const { getByRole } = render(<Document>Test content</Document>);
    const doc: HTMLElement = getByRole('document');
    expect(doc).toHaveTextContent('Test content');
  });

  it('should render a banner', (): void => {
    const { getByRole } = render(
      <Document banner="Test banner">Test content</Document>,
    );

    const banner: HTMLElement = getByRole('banner');
    expect(banner).toHaveTextContent('Test banner');
  });

  it('should not contain more than 1 banner', (): void => {
    const { expectToHaveThrown } = render(
      <Document banner="First banner">
        <Banner>Second banner</Banner>
      </Document>,
    );

    expectToHaveThrown(
      'An application or document cannot own multiple banners.',
    );
  });

  it('should render content info', (): void => {
    const { getByRole } = render(
      <Document contentInfo="Test content info">Test content</Document>,
    );

    const contentInfo: HTMLElement = getByRole('contentinfo');
    expect(contentInfo).toHaveTextContent('Test content info');
  });

  it('should not contain more than 1 content info', (): void => {
    const { expectToHaveThrown } = render(
      <Document contentInfo="First content info">
        <ContentInfo>Second content info</ContentInfo>
      </Document>,
    );

    expectToHaveThrown(
      'An application or document cannot own multiple content info.',
    );
  });
});
