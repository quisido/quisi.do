import { describe, it } from 'vitest';
import { Separator } from './index.js';
import { render } from '@testing-library/react';

describe('Separator', (): void => {
  it('should be a separator', (): void => {
    const { getByRole } = render(<Separator />);
    getByRole('separator');
  });
});
