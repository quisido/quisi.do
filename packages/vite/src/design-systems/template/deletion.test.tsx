import { describe, expect, it } from 'vitest';
import { Deletion } from './index.js';
import { render } from '@testing-library/react';

describe('Deletion', (): void => {
  it('should be a deletion', (): void => {
    const { getByRole } = render(<Deletion>Test deletion</Deletion>);
    expect(getByRole('deletion').textContent).toBe('Test deletion');
  });
});
