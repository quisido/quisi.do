import { render, type RenderResult } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { CheckboxProps } from '../core/checkbox-props.js';
import validateChecked from '../../../test/validate-checked.js';

const handleTestCheck = vi.fn();
const handleTestUncheck = vi.fn();
const USER: UserEvent = userEvent.setup();

export default function testCheckbox(
  Checkbox: ComponentType<CheckboxProps>,
): void {
  const renderCheckbox = (props: Partial<CheckboxProps>): RenderResult =>
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
      const { getByRole } = renderCheckbox({
        label: 'Test indeterminate checkbox',
        value: 'mixed',
      });

      const checkbox: HTMLElement = getByRole('checkbox', {
        name: 'Test indeterminate checkbox',
      });
      validateChecked(checkbox, 'mixed');
    });

    it('should support checked', async (): Promise<void> => {
      const { getByRole } = renderCheckbox({
        label: 'Test checked checkbox',
        value: true,
      });

      const checkbox: HTMLElement = getByRole('checkbox', {
        name: 'Test checked checkbox',
      });

      validateChecked(checkbox, true);
      await USER.click(checkbox);
      expect(handleTestUncheck).toHaveBeenCalledExactlyOnceWith();
    });

    it('should support unchecked', async (): Promise<void> => {
      const { getByRole } = renderCheckbox({
        label: 'Test unchecked checkbox',
        value: false,
      });

      const checkbox: HTMLElement = getByRole('checkbox', {
        name: 'Test unchecked checkbox',
      });

      validateChecked(checkbox, false);
      await USER.click(checkbox);
      expect(handleTestCheck).toHaveBeenCalledExactlyOnceWith();
    });
  });
}
