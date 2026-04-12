import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TextBoxProps } from '../core/text-box-props.js';

export default function testTextBox(
  TextBox: ComponentType<TextBoxProps>,
): void {
  describe('TextBox', (): void => {
    it('should be a text box', (): void => {
      const { getByName } = render(<TextBox label="Test text box" />);

      getByName('textbox', 'Test text box');
    });

    it('should support multiline text boxes', (): void => {
      const { getByName } = render(
        <TextBox label="Test multiline text box" multiline />,
      );

      getByName('textbox', 'Test multiline text box');
    });
  });
}
