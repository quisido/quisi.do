import { describe, expect, it } from 'vitest';
import { Insertion } from './index.js';
import { render } from '@testing-library/react';

describe('Insertion', (): void => {
  it('should be an insertion', (): void => {
    const { getByRole } = render(<Insertion>Test insertion</Insertion>);
    expect(getByRole('insertion').textContent).toBe('Test insertion');
  });
});
