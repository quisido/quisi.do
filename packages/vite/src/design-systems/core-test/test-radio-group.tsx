import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { RadioGroupProps } from '../core/radio-group-props.js';
import type { RadioProps } from '../core/radio-props.js';

interface Options {
  readonly Radio: ComponentType<RadioProps>;
}

export default function testRadioGroup(
  RadioGroup: ComponentType<RadioGroupProps>,
  { Radio }: Options,
): void {
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
}
