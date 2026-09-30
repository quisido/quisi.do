import { describe, expect, it } from 'vitest';

import importTestedDesignSystem from './import-tested-design-system.js';
import render from './render.js';

const { Banner, Document } = await importTestedDesignSystem();

describe('Banner', (): void => {
  it('should be a banner', (): void => {
    const { getByRole } = render(
      <Document>
        <Banner>Test content</Banner>
      </Document>,
    );

    expect(getByRole('banner')).toMatchTextContent('Test content');
  });
});
