import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Group } from './index.js';

describe('Group', (): void => {
  it('should be a group', (): void => {
    const { getByRole } = render(
      <Group label="Test group">Test content</Group>,
    );

    getByRole('group', { name: 'Test group' });
  });
});
