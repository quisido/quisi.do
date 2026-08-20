import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import importTestedDesignSystem from './import-tested-design-system.js';

const { ListBox } = await importTestedDesignSystem();

const handleChange = vi.fn();

describe('ListBox', (): void => {
  it('should expose a named vertical listbox of options', (): void => {
    const { getByName, getRoleCount } = render(
      <ListBox
        label="Available colors"
        onChange={vi.fn()}
        options={[
          { children: 'Red', value: 'red' },
          { children: 'Blue', value: 'blue' },
        ]}
        values={new Set()}
      />,
    );

    const listBox: HTMLElement = getByName('listbox', 'Available colors');
    expect(listBox).toHaveAttribute('aria-orientation', 'vertical');
    expect(getRoleCount('option')).toBe(2);
  });

  it('should manage option focus through the listbox', async (): Promise<void> => {
    const { getByName, tab } = render(
      <ListBox
        label="Focusable choices"
        onChange={vi.fn()}
        options={[{ children: 'Choice', value: 'choice' }]}
        values={new Set()}
      />,
    );

    const listBox: HTMLElement = getByName('listbox', 'Focusable choices');
    await tab();
    expect(listBox).toHaveFocus();
  });

  it('should support horizontal orientation', (): void => {
    const { getByName } = render(
      <ListBox
        label="Horizontal choices"
        onChange={vi.fn()}
        options={[]}
        orientation="horizontal"
        values={new Set()}
      />,
    );

    expect(getByName('listbox', 'Horizontal choices')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });

  it('should emit a change event', async (): Promise<void> => {
    const { getByName } = render(
      <>
        <span id="test-list-box-external-label-id">Changeable</span>
        <ListBox
          labelledBy="test-list-box-external-label-id"
          onChange={handleChange}
          options={[{ children: 'First', value: '1' }]}
          values={new Set()}
        />
      </>,
    );

    const listBox: HTMLElement = getByName('listbox', 'Changeable');
    await userEvent.selectOptions(listBox, ['1']);
    expect(handleChange).toHaveBeenCalledExactlyOnceWith(new Set(['1']));
  });

  /**
   * DO: "Authors MUST manage focus on this container role."
   * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
   */
});
