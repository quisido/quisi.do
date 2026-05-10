import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Form, TextBox } = await importTestedDesignSystem();

const handleChange = vi.fn();
const handleSubmit = vi.fn();

describe('TextBox', (): void => {
  it('should default to single-line', (): void => {
    const { getByName } = render(
      <TextBox label="Single-line" onChange={handleChange} value="" />,
    );

    const textBox: HTMLElement = getByName('textbox', 'Single-line');
    expect(textBox).toHaveAttribute('aria-multiline', 'false');
  });

  it('should support multiline', (): void => {
    const { getByName } = render(
      <TextBox label="Multiline" multiline onChange={handleChange} value="" />,
    );

    const textBox: HTMLElement = getByName('textbox', 'Multiline');
    expect(textBox).toHaveAttribute('aria-multiline', 'true');
  });

  it('should submit the form when Enter is pressed in single-line', async (): Promise<void> => {
    const { enter, getByName, tab } = render(
      <Form heading="Submittable form" onSubmit={handleSubmit}>
        <TextBox label="Press Enter" onChange={handleChange} value="" />
      </Form>,
    );

    const textBox: HTMLElement = getByName('textbox', 'Press Enter');
    await tab();
    expect(textBox).toHaveFocus();
    await enter();
    expect(handleChange).not.toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledExactlyOnceWith();
  });

  it('should not submit a form when Enter is pressed in multiline', async (): Promise<void> => {
    const { enter, focus, getByName } = render(
      <Form heading="Unsubmittable form" onSubmit={handleSubmit}>
        <TextBox
          label="Press Enter or don't"
          multiline
          onChange={handleChange}
          value=""
        />
      </Form>,
    );

    const textBox: HTMLElement = getByName('textbox', "Press Enter or don't");
    focus(textBox);
    await enter();
    expect(handleChange).toHaveBeenCalledExactlyOnceWith('\n');
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  /**
   * TODO: Authors MUST limit the children of a textbox to non-interactive, entirely presentational elements such as icons used to visually convey information that is already exposed in an accessible manner.
   */
});
