import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Document } from './index.js';

describe('Document', (): void => {
  it('should be a document', (): void => {
    const { getByRole } = render(
      <Document label="Test document">Test content</Document>,
    );

    getByRole('document', { name: 'Test document' });
  });
});
