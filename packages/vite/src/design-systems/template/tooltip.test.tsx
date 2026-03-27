import { describe, expect, it } from 'vitest';
import { Tooltip } from './index.js';
import { render } from '@testing-library/react';

describe('Tooltip', (): void => {
  it('should describe an element', (): void => {
    const { getByRole } = render(
      <>
        <button id="test-id">Test button</button>
        <Tooltip htmlFor="test-id">Test tooltip</Tooltip>
      </>,
    );
    getByRole('button', { description: 'Test tooltip' });
  });

  it('should throw when not describing an element', (): void => {
    expect((): void => {
      render(<Tooltip htmlFor="non-existent-id">Test tooltip</Tooltip>);
    }).toThrow('A tooltip must describe an element.');
  });
});
