import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Form } from './index.js';

describe('Form', (): void => {
  it('should be a form', (): void => {
    const { getByRole } = render(<Form label="Test form">Test content</Form>);

    getByRole('form', { name: 'Test form' });
  });
});
