import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { TextBoxProps } from '../core/text-box-props.js';
import type { FormProps } from '../core/form-props.js';
import userEvent from '@testing-library/user-event';

interface Options {
  readonly Form: ComponentType<FormProps>;
}

export default function testTextBox(
  TextBox: ComponentType<TextBoxProps>,
  { Form }: Options,
): void {
  const handleTestChange = vi.fn();

  describe('TextBox', (): void => {
    it('should default to single-line', (): void => {
      const { getByName } = render(
        <TextBox label="Test text box" onChange={handleTestChange} value="" />,
      );

      const textBox: HTMLElement = getByName('textbox', 'Test text box');
      expect(textBox).toHaveAttribute('aria-multiline', 'false');
    });

    it('should support multiline', (): void => {
      const { getByName } = render(
        <TextBox
          label="Test multiline text box"
          multiline
          onChange={handleTestChange}
          value=""
        />,
      );

      const textBox: HTMLElement = getByName(
        'textbox',
        'Test multiline text box',
      );
      expect(textBox).toHaveAttribute('aria-multiline', 'true');
    });

    it('should submit the form when Enter is pressed in single-line', async (): Promise<void> => {
      const handleTestSubmit = vi.fn();

      const { getByName } = render(
        <Form heading="Single-line Enter form" onSubmit={handleTestSubmit}>
          <TextBox
            label="Single-line Enter text box"
            onChange={handleTestChange}
            value=""
          />
        </Form>,
      );

      const textBox: HTMLElement = getByName(
        'textbox',
        'Single-line Enter text box',
      );

      textBox.focus();
      await userEvent.keyboard('{Enter}');

      expect(handleTestChange).not.toHaveBeenCalled();
      expect(handleTestSubmit).toHaveBeenCalledExactlyOnceWith();
    });

    it('should not submit a form when Enter is pressed in multiline', async (): Promise<void> => {
      const handleTestSubmit = vi.fn();

      const { getByName } = render(
        <Form heading="Multiline Enter form" onSubmit={handleTestSubmit}>
          <TextBox
            label="Multiline Enter text box"
            multiline
            onChange={handleTestChange}
            value=""
          />
        </Form>,
      );

      const textBox: HTMLElement = getByName(
        'textbox',
        'Multiline Enter text box',
      );

      textBox.focus();
      await userEvent.keyboard('{Enter}');

      expect(handleTestChange).toHaveBeenCalledExactlyOnceWith('\n');
      expect(handleTestSubmit).not.toHaveBeenCalled();
    });

    /**
     * TODO: Authors MUST limit the children of a textbox to non-interactive, entirely presentational elements such as icons used to visually convey information that is already exposed in an accessible manner.
     */
  });
}
