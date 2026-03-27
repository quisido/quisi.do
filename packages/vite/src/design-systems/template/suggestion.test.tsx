import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Suggestion } from './index.js';

describe('Suggestion', (): void => {
  it('should be a suggestion', (): void => {
    const { getByRole } = render(
      <Suggestion label="Test suggestion">Test suggestion content</Suggestion>,
    );

    getByRole('suggestion', { name: 'Test suggestion' });
  });
});
