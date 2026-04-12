import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ListBoxProps } from '../core/list-box-props.js';
import type { OptionProps } from '../core/option-props.js';
import render from './render.js';

interface Options {
  readonly ListBox: ComponentType<ListBoxProps>;
}

export default function testOption(
  Option: ComponentType<OptionProps>,
  { ListBox }: Options,
): void {
  describe('Option', (): void => {
    it('should be an option', (): void => {
      const { getByName } = render(
        <ListBox label="Test list box">
          <Option>Test option</Option>
        </ListBox>,
      );

      getByName('option', 'Test option');
    });
  });
}
