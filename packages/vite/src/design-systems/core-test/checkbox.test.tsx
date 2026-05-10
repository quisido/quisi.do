import { describe, expect, it, vi } from 'vitest';
import type { CheckboxProps } from '../core/checkbox-props.js';
import validateChecked from '../../../test/validate-checked.js';
import render, { type RenderTest } from './render.js';
import { userEvent } from '@testing-library/user-event';
import expectToBeReadOnly from '../../../test/expect-to-be-readonly.js';
import importTestedDesignSystem from './import-tested-design-system.js';

interface CheckboxTest extends RenderTest {
  readonly checkbox: HTMLInputElement;
  readonly handleCheck: VoidFunction;
  readonly handleUncheck: VoidFunction;
}

const { Checkbox } = await importTestedDesignSystem();

const renderCheckbox = ({
  label = 'Test label',
  onCheck: handleCheck = vi.fn(),
  onUncheck: handleUncheck = vi.fn(),
  value = false,
  ...props
}: Partial<CheckboxProps> = {}): CheckboxTest => {
  const result: RenderTest = render(
    <Checkbox
      label={label}
      onCheck={handleCheck}
      onUncheck={handleUncheck}
      value={value}
      {...props}
    />,
  );

  const checkbox: HTMLElement = result.getByName('checkbox', label);

  return {
    ...result,
    checkbox: checkbox as HTMLInputElement,
    handleCheck,
    handleUncheck,
  };
};

describe('Checkbox', (): void => {
  it('should be a named native checkbox', (): void => {
    const { checkbox } = renderCheckbox({ label: 'Named checkbox' });

    expect(checkbox.tagName).toBe('INPUT');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('should not use aria-checked on native checkboxes', (): void => {
    const { checkbox } = renderCheckbox({ value: true });

    expect(checkbox).not.toHaveAttribute('aria-checked');
  });

  it('should support checked', (): void => {
    const { checkbox } = renderCheckbox({
      label: 'Test checked checkbox',
      value: true,
    });

    validateChecked(checkbox, true);
  });

  it('should support unchecked', (): void => {
    const { checkbox } = renderCheckbox({
      label: 'Test unchecked checkbox',
      value: false,
    });

    validateChecked(checkbox, false);
  });

  it('should support mixed', (): void => {
    const { checkbox } = renderCheckbox({
      label: 'Test mixed checkbox',
      value: 'mixed',
    });

    validateChecked(checkbox, 'mixed');
  });

  it('should call onUncheck when a checked checkbox is clicked', async (): Promise<void> => {
    const { checkbox, handleCheck, handleUncheck } = renderCheckbox({
      label: 'Test checked checkbox',
      value: true,
    });

    await userEvent.click(checkbox);
    expect(handleCheck).not.toHaveBeenCalled();
    expect(handleUncheck).toHaveBeenCalledExactlyOnceWith();
  });

  it('should call onCheck when an unchecked checkbox is clicked', async (): Promise<void> => {
    const { checkbox, handleCheck, handleUncheck } = renderCheckbox({
      label: 'Test unchecked checkbox',
      value: false,
    });

    await userEvent.click(checkbox);
    expect(handleCheck).toHaveBeenCalledExactlyOnceWith();
    expect(handleUncheck).not.toHaveBeenCalled();
  });

  it('should call onCheck when a mixed checkbox is clicked', async (): Promise<void> => {
    const { checkbox, handleCheck, handleUncheck } = renderCheckbox({
      label: 'Test mixed checkbox',
      value: 'mixed',
    });

    await userEvent.click(checkbox);
    expect(handleCheck).toHaveBeenCalledExactlyOnceWith();
    expect(handleUncheck).not.toHaveBeenCalled();
  });

  it('should toggle with the Space key', async (): Promise<void> => {
    const { checkbox, focus, handleCheck, handleUncheck } = renderCheckbox({
      label: 'Keyboard checkbox',
      value: false,
    });

    focus(checkbox);
    expect(checkbox).toHaveFocus();

    await userEvent.keyboard('[Space]');
    expect(handleCheck).toHaveBeenCalledExactlyOnceWith();
    expect(handleUncheck).not.toHaveBeenCalled();
  });

  it('should be reachable with keyboard navigation', async (): Promise<void> => {
    const { checkbox, tab } = renderCheckbox({ label: 'Tab checkbox' });

    await tab();
    expect(checkbox).toHaveFocus();
  });

  it('should support required', (): void => {
    const { checkbox } = renderCheckbox({ required: true });
    expect(checkbox).toBeRequired();
  });

  it('should support disabled', async (): Promise<void> => {
    const { checkbox, handleCheck, handleUncheck } = renderCheckbox({
      disabled: true,
      label: 'Disabled checkbox',
      value: false,
    });

    expect(checkbox).toBeDisabled();

    await userEvent.click(checkbox);
    expect(handleCheck).not.toHaveBeenCalled();
    expect(handleUncheck).not.toHaveBeenCalled();
  });

  it('should support read only', (): void => {
    const { checkbox } = renderCheckbox({
      label: 'Read only checkbox',
      readOnly: true,
    });

    expectToBeReadOnly(checkbox);
  });
});
