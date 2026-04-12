import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { ComboBoxProps } from '../core/combo-box-props.js';
import render from './render.js';
import { userEvent } from '@testing-library/user-event';

const handleTestChange = vi.fn();

export default function testComboBox(
  ComboBox: ComponentType<ComboBoxProps>,
): void {
  describe('ComboBox', (): void => {
    it('should be a combo box', (): void => {
      const { getByName } = render(
        <ComboBox
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
        <ComboBox
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
        <ComboBox
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
  });
}
