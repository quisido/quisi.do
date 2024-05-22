import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Null from './null.js';

describe('Null', (): void => {
  it('should render nothing', (): void => {
    const { container } = render(<Null />);
    expect(container.innerHTML).toBe('');
  });
});
