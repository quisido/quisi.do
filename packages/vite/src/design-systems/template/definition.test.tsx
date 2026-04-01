import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Definition } from './index.js';

describe('Definition', (): void => {
  it('should be a definition', (): void => {
    const { getByRole } = render(
      <Definition id="test-id">Definition content</Definition>,
    );

    expect(getByRole('definition').textContent).toBe('Definition content');
  });
});
