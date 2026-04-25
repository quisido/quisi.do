import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Radio, RadioGroup } from './index.js';

describe('RadioGroup', (): void => {
  it('should be a radio group', (): void => {
    const { getByRole } = render(
      <RadioGroup label="Test radio group">
        <Radio label="Test radio" />
      </RadioGroup>,
    );

    getByRole('radiogroup', { name: 'Test radio group' });
  });

  // TODO: If a caption exists, it must be the first non-generic descendant.
});
