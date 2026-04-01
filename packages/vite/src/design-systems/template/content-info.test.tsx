import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContentInfo } from './index.js';

describe('ContentInfo', (): void => {
  it('should be content info', (): void => {
    const { getByRole } = render(<ContentInfo>Test content</ContentInfo>);

    expect(getByRole('contentinfo').textContent).toBe('Test content');
  });
});
