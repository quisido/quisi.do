import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Banner, Document } = await importTestedDesignSystem();

describe('Banner', (): void => {
  it('should be a banner', (): void => {
    const { getByRole } = render(
      <Document>
        <Banner>Test content</Banner>
      </Document>,
    );

    expect(getByRole('banner')).toHaveTextContent('Test content');
  });
});
