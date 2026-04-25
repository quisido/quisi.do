import { describe, expect, it } from 'vitest';
import { Paragraph } from './index.js';
import { render } from '@testing-library/react';

describe('Paragraph', (): void => {
  it('should be a paragraph', (): void => {
    const { getByRole } = render(<Paragraph>Test paragraph</Paragraph>);
    expect(getByRole('paragraph').textContent).toBe('Test paragraph');
  });
});
