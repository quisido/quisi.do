import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { ComboboxProps } from '../core/combobox-props.js';
import render from './render.js';
import { userEvent } from '@testing-library/user-event';

const handleTestChange = vi.fn();

export default function testCombobox(
  Combobox: ComponentType<ComboboxProps>,
): void {
  describe('Combobox', (): void => {
    it('should be a combo box', (): void => {
      const { getByName } = render(
        <Combobox
          label="Test combo box"
          onChange={handleTestChange}
          options={[]}
          value=""
        />,
      );

      getByName('combobox', 'Test combo box');
    });

    it('should support keyboard selection', async (): Promise<void> => {
      const { getByName } = render(
        <Combobox
          label="States"
          onChange={handleTestChange}
          options={['Alabama', 'Alaska', 'California']}
          value=""
        />,
      );

      const comboBox: HTMLElement = getByName('combobox', 'States');
      await userEvent.type(comboBox, 'A');
      expect(comboBox).toHaveAttribute('value', 'Alabama');
      await userEvent.keyboard('{ArrowDown}');
      expect(comboBox).toHaveAttribute('value', 'Alaska');

      const option: HTMLElement = getByName('option', 'Alaska');
      expect(option).toHaveAttribute('aria-selected', 'true');

      await userEvent.keyboard('{Enter}');
      expect(handleTestChange).toHaveBeenCalledExactlyOnceWith('Alaska');
    });

    it('should support pointer selection', async (): Promise<void> => {
      const { getByName } = render(
        <Combobox
          label="States"
          onChange={handleTestChange}
          options={['Alabama', 'Alaska', 'California']}
          value=""
        />,
      );

      const comboBox: HTMLElement = getByName('combobox', 'States');
      await userEvent.click(comboBox);

      const option: HTMLElement = getByName('option', 'California');
      await userEvent.click(option);

      expect(handleTestChange).toHaveBeenCalledExactlyOnceWith('California');
    });

    it('should be expandable', async (): Promise<void> => {
      const { getByName } = render(
        <Combobox
          label="Expandable"
          onChange={handleTestChange}
          options={[]}
          value=""
        />,
      );
      const combobox: HTMLElement = getByName('combobox', 'Expandable');
      expect(combobox).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(combobox);
      expect(combobox).toHaveAttribute('aria-expanded', 'true');
    });

    // TODO: Comboboxes have an implicit aria-haspopup value of listbox. If the combobox popup element has a role other than listbox, authors MUST specify an aria-haspopup value of tree, grid, menu, or dialog that corresponds to the role of its popup.

    /**
     *   If the user interface includes an additional icon that allows the
     * visibility of the popup to be controlled via pointer and touch events,
     * ensure that element has role button, that it is focusable but not
     * included in the page Tab sequence, and that it is not a descendant of
     * the element with role combobox.
     */

    /**
     *  In addition, to be keyboard accessible, authors SHOULD provide keyboard mechanisms for moving focus between the combobox element and elements contained in the popup. For example, one common convention is that Down Arrow moves focus from the input to the first focusable descendant of the popup element. If the popup element supports aria-activedescendant, in lieu of moving focus, such keyboard mechanisms can control the value of aria-activedescendant on the combobox element. When a descendant of the popup element is active, authors MAY set aria-activedescendant on the combobox to a value that refers to the active element within the popup while focus remains on the combobox element.
     */
  });
}
