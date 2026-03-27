import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Figure } from './index.js';

describe('Figure', (): void => {
  it('should be a figure', (): void => {
    const { getByRole } = render(
      <Figure label="Test figure">
        <div>Test content</div>
      </Figure>,
    );

    getByRole('figure', { name: 'Test figure' });
  });
});
