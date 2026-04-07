import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TextBoxProps } from '../core/text-box-props.js';

export default function testTextBox(
  TextBox: ComponentType<TextBoxProps>,
): void {
  describe('TextBox', (): void => {
    it('should be a text box', (): void => {
      const { getByRole } = render(<TextBox label="Test text box" />);

      getByRole('textbox', { name: 'Test text box' });
    });

    it('should support multiline text boxes', (): void => {
      const { getByRole } = render(
        <TextBox label="Test multiline text box" multiline />,
      );

      getByRole('textbox', { name: 'Test multiline text box' });
    });
  });
}
