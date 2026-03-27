import { describe, it } from 'vitest';
import { Paragraph } from './index.js';
import { render } from '@testing-library/react';

describe('Paragraph', (): void => {
  it('should be a paragraph', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Paragraph describedBy="test-id">Test paragraph</Paragraph>
      </>,
    );
    getByRole('paragraph', { description: 'Test description' });
  });
});
