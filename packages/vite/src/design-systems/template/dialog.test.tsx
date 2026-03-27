import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Dialog } from './index.js';

describe('Dialog', (): void => {
  it('should be a dialog', (): void => {
    const { getByRole } = render(
      <Dialog label="Test dialog">Test content</Dialog>,
    );

    getByRole('dialog', { name: 'Test dialog' });
  });
});
