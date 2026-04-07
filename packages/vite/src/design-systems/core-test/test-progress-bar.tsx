import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ProgressBarProps } from '../core/progress-bar-props.js';

export default function testProgressBar(
  ProgressBar: ComponentType<ProgressBarProps>,
): void {
  describe('ProgressBar', (): void => {
    it('should be a progress bar', (): void => {
      const { getByRole } = render(<ProgressBar label="Test progress bar" />);

      getByRole('progressbar', { name: 'Test progress bar' });
    });
  });
}
