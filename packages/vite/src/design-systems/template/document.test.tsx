import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Banner, Document } from './index.js';

describe('Document', (): void => {
  it('should be a document', (): void => {
    const { getByRole } = render(
      <Document label="Test document">Test content</Document>,
    );

    getByRole('document', { name: 'Test document' });
  });

  it('should render a banner', (): void => {
    const { getByRole } = render(
      <Document banner="Test banner">Test content</Document>,
    );

    expect(getByRole('banner').textContent).toBe('Test banner');
  });

  it('should not contain more than 1 banner', (): void => {
    expect((): void => {
      render(
        <Document banner="First banner">
          <Banner>Second banner</Banner>
        </Document>,
      );
    }).toThrow('An application or document cannot own more than one banner.');
  });
});
