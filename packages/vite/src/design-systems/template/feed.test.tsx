import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Feed } from './index.js';

describe('Feed', (): void => {
  it('should be a feed', (): void => {
    const { getByRole } = render(<Feed label="Test feed">Test content</Feed>);

    getByRole('feed', { name: 'Test feed' });
  });
});
