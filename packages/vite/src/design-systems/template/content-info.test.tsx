import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ContentInfo } from './index.js';

describe('ContentInfo', (): void => {
  it('should be content info', (): void => {
    const { getByRole } = render(
      <ContentInfo label="Test content info">Test content</ContentInfo>,
    );

    getByRole('contentinfo', { name: 'Test content info' });
  });
});
