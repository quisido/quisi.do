import { cleanup, render } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import type { ComponentType } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ComboBoxProps } from '../core/combo-box-props.js';

const handleTestChange = vi.fn();
const USER: UserEvent = userEvent.setup();

export default function testComboBox(
  ComboBox: ComponentType<ComboBoxProps>,
): void {
  describe('ComboBox', (): void => {
    afterEach((): void => {
      cleanup();
    });

    beforeEach((): void => {
      handleTestChange.mockReset();
    });

    it('should be a combo box', (): void => {
      const { getByRole } = render(
        <ComboBox
          label="Test combo box"
          onChange={handleTestChange}
          options={[]}
          value=""
        />,
      );

      getByRole('combobox', { name: 'Test combo box' });
    });

    it('should support keyboard selection', async (): Promise<void> => {
      const { getByRole } = render(
        <ComboBox
          label="States"
          onChange={handleTestChange}
          options={['Alabama', 'Alaska', 'California']}
          value=""
        />,
      );

      const combobox: HTMLInputElement = getByRole('combobox', {
        name: 'States',
      }) as HTMLInputElement;

      await USER.type(combobox, 'A');
      expect(combobox.value).toBe('Alabama');

      await USER.keyboard('{ArrowDown}');
      expect(combobox.value).toBe('Alaska');
      expect(
        getByRole('option', { name: 'Alaska' }).getAttribute('aria-selected'),
      ).toBe('true');

      await USER.keyboard('{Enter}');
      expect(handleTestChange).toHaveBeenCalledExactlyOnceWith('Alaska');
    });

    it('should support pointer selection', async (): Promise<void> => {
      const { getByRole } = render(
        <ComboBox
          label="States"
          onChange={handleTestChange}
          options={['Alabama', 'Alaska', 'California']}
          value=""
        />,
      );

      const combobox: HTMLElement = getByRole('combobox', { name: 'States' });

      await USER.click(combobox);
      await USER.click(getByRole('option', { name: 'California' }));

      expect(handleTestChange).toHaveBeenCalledExactlyOnceWith('California');
    });
  });
}
