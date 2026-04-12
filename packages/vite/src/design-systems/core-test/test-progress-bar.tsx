import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ProgressBarProps } from '../core/progress-bar-props.js';

export default function testProgressBar(
  ProgressBar: ComponentType<ProgressBarProps>,
): void {
  describe('ProgressBar', (): void => {
    it('should be a progress bar', (): void => {
      const { getByName } = render(<ProgressBar label="Test progress bar" />);

      getByName('progressbar', 'Test progress bar');
    });
  });
}
