import { fireEvent } from '@testing-library/react';
import render from './render.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Form, TextBox } = await importTestedDesignSystem();

const handleChange = vi.fn();
const handleSubmit = vi.fn();

describe('TextBox', (): void => {
  beforeEach((): void => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });

  it('should expose a named single-line text input by default', (): void => {
    const { getByName, getRoleCount } = render(
      <TextBox
        label="Single-line"
        onChange={handleChange}
        value="Initial value"
      />,
    );

    const textBox: HTMLElement = getByName('textbox', 'Single-line');
    expect(textBox.tagName).toBe('INPUT');
    expect(textBox).toHaveAttribute('type', 'text');
    expect(textBox).toHaveAttribute('aria-multiline', 'false');
    expect(textBox).toHaveValue('Initial value');
    expect(getRoleCount('textbox')).toBe(1);
  });

  it('should emit free-form text changes from a single-line input', (): void => {
    const { getByName } = render(
      <TextBox label="Name" onChange={handleChange} value="" />,
    );

    fireEvent.change(getByName('textbox', 'Name'), {
      target: { value: 'Ada Lovelace' },
    });

    expect(handleChange).toHaveBeenCalledExactlyOnceWith('Ada Lovelace');
  });

  it('should update its displayed single-line value from its controlled value', (): void => {
    const { getByName, rerender } = render(
      <TextBox label="Controlled name" onChange={handleChange} value="" />,
    );

    const textBox: HTMLElement = getByName('textbox', 'Controlled name');

    rerender(
      <TextBox
        label="Controlled name"
        onChange={handleChange}
        value="Grace Hopper"
      />,
    );

    expect(textBox).toHaveValue('Grace Hopper');
  });

  it('should expose a named multiline textarea when multiline is true', (): void => {
    const { getByName } = render(
      <TextBox
        label="Multiline"
        multiline
        onChange={handleChange}
        value={'Line one\nLine two'}
      />,
    );

    const textBox: HTMLElement = getByName('textbox', 'Multiline');
    expect(textBox.tagName).toBe('TEXTAREA');
    expect(textBox).toHaveAttribute('aria-multiline', 'true');
    expect(textBox).toHaveValue('Line one\nLine two');
  });

  it('should emit free-form text changes with line breaks from a multiline textarea', (): void => {
    const { getByName } = render(
      <TextBox label="Notes" multiline onChange={handleChange} value="" />,
    );

    fireEvent.change(getByName('textbox', 'Notes'), {
      target: { value: 'Line one\nLine two' },
    });

    expect(handleChange).toHaveBeenCalledExactlyOnceWith('Line one\nLine two');
  });

  it('should limit textbox descendants to the native text field contents', (): void => {
    const { getByName, getRoleCount } = render(
      <>
        <TextBox label="Username" onChange={handleChange} value="" />
        <TextBox label="Biography" multiline onChange={handleChange} value="" />
      </>,
    );

    const username: HTMLElement = getByName('textbox', 'Username');
    const biography: HTMLElement = getByName('textbox', 'Biography');

    expect(username.children).toHaveLength(0);
    expect(biography.children).toHaveLength(0);
    expect(getRoleCount('button')).toBe(0);
    expect(getRoleCount('link')).toBe(0);
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
    const { enter, getByName, tab } = render(
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
    await tab();
    expect(textBox).toHaveFocus();
    await enter();
    expect(handleChange).toHaveBeenCalledExactlyOnceWith('\n');
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
