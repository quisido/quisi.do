import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import importTestedDesignSystem from './import-tested-design-system.js';

const { ListBox } = await importTestedDesignSystem();

const handleTestChange = vi.fn();

describe('ListBox', (): void => {
  it('should emit a change event', async (): Promise<void> => {
    const { getByName } = render(
      <>
        <span id="test-list-box-labelled-by-id">Test list box label</span>
        <ListBox
          labelledBy="test-list-box-labelled-by-id"
          onChange={handleTestChange}
          options={[{ children: 'First', value: '1' }]}
          values={new Set()}
        />
      </>,
    );

    const listBox: HTMLElement = getByName('listbox', 'Change handler');
    await userEvent.selectOptions(listBox, ['1']);

    expect(handleTestChange).toHaveBeenCalledExactlyOnceWith(new Set(['1']));
  });

  /**
   * DO: "Authors MUST manage focus on this container role."
   * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
   */
});
