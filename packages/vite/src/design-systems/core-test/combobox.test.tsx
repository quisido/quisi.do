import { beforeEach, describe, expect, it, vi } from 'vitest';
import render from './render.js';
import { userEvent } from '@testing-library/user-event';
import importTestedDesignSystem from './import-tested-design-system.js';

const handleChange = vi.fn();

const { Combobox } = await importTestedDesignSystem();

const getControlledListBox = (combobox: HTMLElement): HTMLElement => {
  const listBoxId: string | null = combobox.getAttribute('aria-controls');

  if (listBoxId === null) {
    throw new Error('Expected combobox to control a listbox.');
  }

  const listBox: HTMLElement | null =
    combobox.ownerDocument.getElementById(listBoxId);

  if (listBox === null) {
    throw new Error(`Expected combobox to control #${listBoxId}.`);
  }

  return listBox;
};

const getActiveDescendant = (combobox: HTMLElement): HTMLElement => {
  const activeDescendantId: string | null = combobox.getAttribute(
    'aria-activedescendant',
  );

  if (activeDescendantId === null) {
    throw new Error('Expected combobox to have an active descendant.');
  }

  const activeDescendant: HTMLElement | null =
    combobox.ownerDocument.getElementById(activeDescendantId);

  if (activeDescendant === null) {
    throw new Error(
      `Expected combobox active descendant #${activeDescendantId}.`,
    );
  }

  return activeDescendant;
};

const getOptions = (listBox: HTMLElement): readonly HTMLElement[] => {
  return Array.from(listBox.querySelectorAll('[role="option"]'));
};

const getOptionNames = (listBox: HTMLElement): readonly string[] => {
  return getOptions(listBox).map(
    (option: Element): string => option.textContent ?? '',
  );
};

describe('Combobox', (): void => {
  beforeEach((): void => {
    handleChange.mockClear();
  });

  it('should expose a named editable value with list autocomplete', (): void => {
    const { getByName, getRoleCount } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value="Alaska"
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const button: HTMLElement = getByName('button', 'Show States options');
    const listBox: HTMLElement = getControlledListBox(combobox);
    const popupRole: string =
      combobox.getAttribute('aria-haspopup') ?? 'listbox';

    expect(combobox.tagName).toBe('INPUT');
    expect(combobox).toHaveAttribute('type', 'text');
    expect(combobox).toHaveAttribute('role', 'combobox');
    expect(combobox).toHaveAccessibleName('States');
    expect(combobox.tabIndex).toBe(0);
    expect(combobox).toHaveAttribute('aria-autocomplete', 'both');
    expect(combobox).toHaveAttribute('aria-controls', listBox.id);
    expect(['dialog', 'grid', 'listbox', 'menu', 'tree']).toContain(popupRole);
    expect(combobox.childElementCount).toBe(0);
    expect(combobox.contains(listBox)).toBe(false);
    expect(combobox).not.toHaveAttribute('aria-owns');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
    expect(combobox).toHaveValue('Alaska');
    expect(popupRole).toBe('listbox');
    expect(listBox).toHaveAttribute('role', popupRole);
    expect(listBox).toHaveAttribute('hidden');
    expect(getRoleCount('combobox')).toBe(1);
    expect(getRoleCount('button')).toBe(1);
    expect(getRoleCount('textbox')).toBe(0);
    expect(getRoleCount('listbox')).toBe(0);
    expect(getRoleCount('option')).toBe(0);
    expect(button).toBeVisible();
  });

  it('should support keyboard selection', async (): Promise<void> => {
    const { enter, getByName } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const comboBox: HTMLElement = getByName('combobox', 'States');
    await userEvent.type(comboBox, 'A');
    expect(comboBox).toHaveValue('Alabama');
    expect(comboBox).toHaveAttribute('aria-expanded', 'true');
    expect(getActiveDescendant(comboBox)).toHaveTextContent('Alabama');
    await userEvent.keyboard('{ArrowDown}');
    expect(comboBox).toHaveValue('Alaska');
    expect(comboBox).toHaveFocus();

    const option: HTMLElement = getByName('option', 'Alaska');
    expect(option).toHaveAttribute('aria-selected', 'true');
    expect(getActiveDescendant(comboBox)).toBe(option);

    await enter();
    expect(handleChange).toHaveBeenCalledExactlyOnceWith('Alaska');
    expect(comboBox).toHaveAttribute('aria-expanded', 'false');
    expect(comboBox).not.toHaveAttribute('aria-activedescendant');
  });

  it('should support pointer selection', async (): Promise<void> => {
    const { getByName } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const comboBox: HTMLElement = getByName('combobox', 'States');
    await userEvent.click(comboBox);

    const option: HTMLElement = getByName('option', 'California');
    await userEvent.click(option);

    expect(handleChange).toHaveBeenCalledExactlyOnceWith('California');
    expect(comboBox).toHaveValue('California');
    expect(comboBox).toHaveFocus();
    expect(comboBox).toHaveAttribute('aria-expanded', 'false');
    expect(comboBox).not.toHaveAttribute('aria-activedescendant');
  });

  it('should synchronize expanded state with popup visibility', async (): Promise<void> => {
    const { getByName, getRoleCount } = render(
      <Combobox
        label="Expandable"
        onChange={handleChange}
        options={['Test option']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'Expandable');
    const listBox: HTMLElement = getControlledListBox(combobox);

    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(listBox).toHaveAttribute('hidden');
    expect(getRoleCount('listbox')).toBe(0);

    await userEvent.click(combobox);

    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(listBox).not.toHaveAttribute('hidden');
    expect(getRoleCount('listbox')).toBe(1);
  });

  it('should expose the controlled popup with the combobox label when expanded', async (): Promise<void> => {
    const { getByName, getRoleCount } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const listBox: HTMLElement = getControlledListBox(combobox);

    expect(getRoleCount('listbox')).toBe(0);

    await userEvent.click(combobox);

    expect(getByName('listbox', 'States')).toBe(listBox);
    expect(listBox).toHaveAccessibleName('States');
  });

  it('should expose matching popup options only while expanded', async (): Promise<void> => {
    const { getByName, getRoleCount } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const listBox: HTMLElement = getControlledListBox(combobox);

    expect(getRoleCount('option')).toBe(0);

    await userEvent.click(combobox);

    expect(combobox).toHaveFocus();
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
    expect(getRoleCount('option')).toBe(3);
    expect(getOptionNames(listBox)).toStrictEqual([
      'Alabama',
      'Alaska',
      'California',
    ]);
    expect(
      getOptions(listBox).map((option: HTMLElement): string | null =>
        option.getAttribute('aria-selected'),
      ),
    ).toStrictEqual(['false', 'false', 'false']);
  });

  it('should expose a separate popup control button outside the combobox tab sequence', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const button: HTMLElement = getByName('button', 'Show States options');
    const listBox: HTMLElement = getControlledListBox(combobox);

    expect(combobox.contains(button)).toBe(false);
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-controls', listBox.id);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('tabindex', '-1');

    await tab();
    expect(combobox).toHaveFocus();
    await tab();
    expect(button).not.toHaveFocus();

    button.focus();
    expect(button).toHaveFocus();

    await userEvent.click(button);

    expect(combobox).toHaveFocus();
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(button);

    expect(combobox).toHaveFocus();
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(listBox).toHaveAttribute('hidden');
  });

  it('should let the popup control button toggle visibility without changing the value', async (): Promise<void> => {
    const { getByName, getRoleCount } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value="Alaska"
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const button: HTMLElement = getByName('button', 'Show States options');
    const listBox: HTMLElement = getControlledListBox(combobox);

    button.focus();
    await userEvent.click(button);

    expect(combobox).toHaveFocus();
    expect(combobox).toHaveValue('Alaska');
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(listBox).not.toHaveAttribute('hidden');
    expect(getRoleCount('option')).toBe(1);
    expect(getOptionNames(listBox)).toStrictEqual(['Alaska']);
    expect(handleChange).not.toHaveBeenCalled();

    await userEvent.click(button);

    expect(combobox).toHaveFocus();
    expect(combobox).toHaveValue('Alaska');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(listBox).toHaveAttribute('hidden');
    expect(getRoleCount('option')).toBe(0);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should collapse the popup when pointer interaction leaves the combobox', async (): Promise<void> => {
    const { getByName, getRoleCount } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const listBox: HTMLElement = getControlledListBox(combobox);

    await userEvent.click(combobox);

    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(getRoleCount('listbox')).toBe(1);

    await userEvent.hover(getByName('option', 'Alaska'));

    expect(getActiveDescendant(combobox)).toHaveTextContent('Alaska');

    await userEvent.click(combobox.ownerDocument.body);

    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
    expect(listBox).toHaveAttribute('hidden');
    expect(getRoleCount('listbox')).toBe(0);
  });

  it('should use Down Arrow to open the popup and activate the first option', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const listBox: HTMLElement = getControlledListBox(combobox);

    await tab();

    expect(combobox).toHaveFocus();
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(listBox).toHaveAttribute('hidden');

    await userEvent.keyboard('{ArrowDown}');

    const activeDescendant: HTMLElement = getActiveDescendant(combobox);
    expect(combobox).toHaveFocus();
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(listBox.contains(activeDescendant)).toBe(true);
    expect(activeDescendant).toHaveAttribute('role', 'option');
    expect(activeDescendant).toHaveAttribute('aria-selected', 'true');
    expect(activeDescendant).toHaveTextContent('Alabama');
  });

  it('should use aria-activedescendant for popup pointer navigation', async (): Promise<void> => {
    const { getByName } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    await userEvent.click(combobox);

    const option: HTMLElement = getByName('option', 'California');
    await userEvent.hover(option);

    expect(combobox).toHaveFocus();
    expect(combobox).toHaveValue('');
    expect(getActiveDescendant(combobox)).toBe(option);
    expect(option).toHaveAttribute('aria-selected', 'true');
  });

  it('should use Up Arrow to open the popup and activate the last option', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');

    await tab();

    expect(combobox).toHaveFocus();
    expect(combobox).toHaveAttribute('aria-expanded', 'false');

    await userEvent.keyboard('{ArrowUp}');

    const activeDescendant: HTMLElement = getActiveDescendant(combobox);
    expect(combobox).toHaveFocus();
    expect(combobox).toHaveValue('California');
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(activeDescendant).toHaveTextContent('California');
    expect(activeDescendant).toHaveAttribute('aria-selected', 'true');
  });

  it('should commit the active popup option on Tab', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    await userEvent.click(combobox);
    await userEvent.type(combobox, 'A');

    expect(getActiveDescendant(combobox)).toHaveTextContent('Alabama');

    await tab();

    expect(handleChange).toHaveBeenCalledExactlyOnceWith('Alabama');
    expect(combobox).toHaveValue('Alabama');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
  });

  it('should filter popup options to autocomplete matches', async (): Promise<void> => {
    const { getByName } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const listBox: HTMLElement = getControlledListBox(combobox);

    await userEvent.click(combobox);
    await userEvent.type(combobox, 'Al');

    expect(combobox).toHaveValue('Alabama');
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(getOptionNames(listBox)).toStrictEqual(['Alabama', 'Alaska']);
  });

  it('should expose inline completion through the host input value', async (): Promise<void> => {
    const { getByName } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLInputElement = getByName(
      'combobox',
      'States',
    ) as HTMLInputElement;
    await userEvent.click(combobox);
    await userEvent.type(combobox, 'A');

    expect(combobox).toHaveAttribute('aria-autocomplete', 'both');
    expect(combobox).toHaveValue('Alabama');
    expect(combobox.selectionStart).toBe(1);
    expect(combobox.selectionEnd).toBe('Alabama'.length);
    expect(getActiveDescendant(combobox)).toHaveTextContent('Alabama');
  });

  it('should keep unmatched typed values without exposing an empty popup', async (): Promise<void> => {
    const { getByName, getRoleCount } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value=""
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const listBox: HTMLElement = getControlledListBox(combobox);

    await userEvent.click(combobox);
    await userEvent.type(combobox, 'Z');

    expect(combobox).toHaveValue('Z');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
    expect(listBox).toHaveAttribute('hidden');
    expect(getRoleCount('listbox')).toBe(0);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should collapse and restore the committed value on Escape', async (): Promise<void> => {
    const { getByName } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value="Alaska"
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    await userEvent.clear(combobox);
    await userEvent.type(combobox, 'C');

    expect(combobox).toHaveValue('California');
    expect(combobox).toHaveAttribute('aria-expanded', 'true');

    await userEvent.keyboard('{Escape}');

    expect(combobox).toHaveValue('Alaska');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
    expect(getControlledListBox(combobox)).toHaveAttribute('hidden');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should synchronize controlled value changes with the host input value', (): void => {
    const { getByName, rerender } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value="Alabama"
      />,
    );

    expect(getByName('combobox', 'States')).toHaveValue('Alabama');

    rerender(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value="California"
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    expect(combobox).toHaveValue('California');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
  });

  it('should expose disabled state without opening the popup', async (): Promise<void> => {
    const { getByName, getRoleCount } = render(
      <Combobox
        disabled
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        value="Alaska"
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const button: HTMLElement = getByName('button', 'Show States options');
    const listBox: HTMLElement = getControlledListBox(combobox);

    expect(combobox).toBeDisabled();
    expect(button).toBeDisabled();
    expect(listBox).toHaveAttribute('aria-disabled', 'true');

    await userEvent.click(combobox);
    await userEvent.click(button);

    expect(combobox).toHaveValue('Alaska');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(listBox).toHaveAttribute('hidden');
    expect(getRoleCount('listbox')).toBe(0);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should expose read-only state without opening the popup', async (): Promise<void> => {
    const { getByName, getRoleCount } = render(
      <Combobox
        label="States"
        onChange={handleChange}
        options={['Alabama', 'Alaska', 'California']}
        readOnly
        value="Alaska"
      />,
    );

    const combobox: HTMLElement = getByName('combobox', 'States');
    const button: HTMLElement = getByName('button', 'Show States options');
    const listBox: HTMLElement = getControlledListBox(combobox);

    expect(combobox).toHaveAttribute('readonly');
    expect(button).toBeDisabled();
    expect(listBox).toHaveAttribute('aria-readonly', 'true');

    await userEvent.click(combobox);
    await userEvent.click(button);

    expect(combobox).toHaveValue('Alaska');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(listBox).toHaveAttribute('hidden');
    expect(getRoleCount('listbox')).toBe(0);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
