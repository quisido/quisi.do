import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { ContentInfo, Document } = await importTestedDesignSystem();

describe('ContentInfo', (): void => {
  it('should be content info', (): void => {
    const { getByRole } = render(
      <Document>
        <ContentInfo>Test content</ContentInfo>
      </Document>,
    );

    const contentInfo: HTMLElement = getByRole('contentinfo');
    expect(contentInfo).toHaveTextContent('Test content');
  });
});
