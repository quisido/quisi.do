import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { CheckboxProps } from '../core/checkbox-props.js';
import validateChecked from '../../../test/validate-checked.js';
import render, { type RenderTest } from './render.js';
import { userEvent } from '@testing-library/user-event';

const handleTestCheck = vi.fn();
const handleTestUncheck = vi.fn();

export default function testCheckbox(
  Checkbox: ComponentType<CheckboxProps>,
): void {
  const renderCheckbox = (props: Partial<CheckboxProps>): RenderTest =>
    render(
      <Checkbox
        label="Test label"
        onCheck={handleTestCheck}
        onUncheck={handleTestUncheck}
        value="mixed"
        {...props}
      />,
    );

  describe('Checkbox', (): void => {
    it('should support indeterminate', (): void => {
      const { getByName } = renderCheckbox({
        label: 'Test indeterminate checkbox',
        value: 'mixed',
      });

      const checkbox: HTMLElement = getByName(
        'checkbox',
        'Test indeterminate checkbox',
      );
      validateChecked(checkbox, 'mixed');
    });

    it('should support checked', async (): Promise<void> => {
      const { getByName } = renderCheckbox({
        label: 'Test checked checkbox',
        value: true,
      });

      const checkbox: HTMLElement = getByName(
        'checkbox',
        'Test checked checkbox',
      );
      validateChecked(checkbox, true);

      await userEvent.click(checkbox);
      expect(handleTestUncheck).toHaveBeenCalledExactlyOnceWith();
    });

    it('should support unchecked', async (): Promise<void> => {
      const { getByName } = renderCheckbox({
        label: 'Test unchecked checkbox',
        value: false,
      });

      const checkbox: HTMLElement = getByName(
        'checkbox',
        'Test unchecked checkbox',
      );
      validateChecked(checkbox, false);

      await userEvent.click(checkbox);
      expect(handleTestCheck).toHaveBeenCalledExactlyOnceWith();
    });
  });
}
