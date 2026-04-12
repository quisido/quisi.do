import render from './render.js';
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
      const { getByName } = render(
        <RadioGroup label="Test radio group">
          <Radio label="Test radio" />
        </RadioGroup>,
      );

      getByName('radiogroup', 'Test radio group');
    });

    /**
     * TODO: "Authors MUST manage focus on this container role."
     * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
     */

    // TODO: If a caption exists, it must be the first non-generic descendant.
  });
}
