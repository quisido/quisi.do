import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ListBoxProps } from '../core/list-box-props.js';
import type { OptionProps } from '../core/option-props.js';

interface Options {
  readonly ListBox: ComponentType<ListBoxProps>;
}

export default function testOption(
  Option: ComponentType<OptionProps>,
  { ListBox }: Options,
): void {
  describe('Option', (): void => {
    it('should be an option', (): void => {
      const { getByRole } = render(
        <ListBox label="Test list box">
          <Option>Test option</Option>
        </ListBox>,
      );

      getByRole('option', { name: 'Test option' });
    });
  });
}
