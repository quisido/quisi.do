import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ListBoxProps } from '../core/list-box-props.js';
import type { OptionProps } from '../core/option-props.js';

interface Options {
  readonly Option: ComponentType<OptionProps>;
}

export default function testListBox(
  ListBox: ComponentType<ListBoxProps>,
  { Option }: Options,
): void {
  describe('ListBox', (): void => {
    it('should be a list box', (): void => {
      const { getByName } = render(
        <ListBox label="Test list box">
          <Option>Test option</Option>
        </ListBox>,
      );

      getByName('listbox', 'Test list box');
    });
  });
}
