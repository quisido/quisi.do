import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Scrollbar } from './index.js';

describe('Scrollbar', (): void => {
  it('should be a scrollbar', (): void => {
    const { getByRole } = render(
      <>
        <div id="test-region">Test content</div>
        <Scrollbar controls="test-region" label="Test scrollbar" />
      </>,
    );

    getByRole('scrollbar', { name: 'Test scrollbar' });
  });
});
