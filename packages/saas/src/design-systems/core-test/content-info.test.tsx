import { describe, expect, it } from 'vitest';

import importTestedDesignSystem from './import-tested-design-system.js';
import render from './render.js';

const { ContentInfo, Document } = await importTestedDesignSystem();

describe('ContentInfo', (): void => {
  it('should be content info', (): void => {
    const { getByRole } = render(
      <Document>
        <ContentInfo>Test content</ContentInfo>
      </Document>,
    );

    const contentInfo: HTMLElement = getByRole('contentinfo');
    expect(contentInfo).toMatchTextContent('Test content');
  });
});
