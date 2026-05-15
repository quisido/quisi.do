import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Document, Main } = await importTestedDesignSystem();

describe('Main', (): void => {
  it('should be main content', (): void => {
    const { getByRole } = render(
      <Document>
        <Main>Test content</Main>
      </Document>,
    );

    expect(getByRole('main')).toHaveTextContent('Test content');
  });
});
