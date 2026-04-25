import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ProgressBar } from './index.js';

describe('ProgressBar', (): void => {
  it('should be a progress bar', (): void => {
    const { getByRole } = render(<ProgressBar label="Test progress bar" />);

    getByRole('progressbar', { name: 'Test progress bar' });
  });
});
