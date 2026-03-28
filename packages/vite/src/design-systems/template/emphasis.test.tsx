import { describe, expect, it } from 'vitest';
import { Emphasis } from './index.js';
import { render } from '@testing-library/react';

describe('Emphasis', (): void => {
  it('should emphasize text', (): void => {
    const { getByRole } = render(<Emphasis>Test emphasis</Emphasis>);
    expect(getByRole('emphasis').textContent).toBe('Test emphasis');
  });
});
