import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { GridProps } from '../core/grid-props.js';

export default function testGrid(Grid: ComponentType<GridProps>): void {
  describe('Grid', (): void => {
    it('should be a grid', (): void => {
      const { getByName } = render(<Grid caption="Test grid" rows={[]} />);
      getByName('grid', 'Test grid');
    });

    it('should contain grid cells', (): void => {
      const { getByName } = render(
        <Grid
          caption="Test grid"
          rows={[{ cells: [{ children: 'Test grid cell', key: 1 }], key: 1 }]}
        />,
      );

      const gridCell: HTMLElement = getByName('gridcell', 'Test grid cell');
      expect(gridCell.parentElement).toHaveAttribute('role', 'row');
    });

    /**
     * TODO: "Authors MUST manage focus on this container role."
     * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
     *
     *   When a user is navigating the grid content with a keyboard, authors
     * SHOULD set focus as follows:
     *   If a grid cell contains a single interactive widget that will not
     * consume arrow key presses when it receives focus, such as a checkbox,
     * button, or link, authors MAY set focus on the interactive element
     * contained in that cell. This allows the contained widget to be directly
     * operable.
     *   Otherwise, authors SHOULD ensure the element that receives focus is a
     * grid cell, row header, or column header element.
     *
     *   Authors SHOULD provide a mechanism for changing to an interaction or
     * edit mode that allows users to navigate and interact with content
     * contained inside a focusable cell if that focusable cell contains any of
     * the following:
     * - a widget that requires arrow keys to operate, e.g., a combo box or
     *   radio group
     * - multiple interactive elements
     * - editable content
     *   For example, if a cell in a spreadsheet contains a combo box or
     * editable text, the Enter key might be used to activate a cell interaction
     * or editing mode when that cell has focus so the directional arrow keys
     * can be used to operate the contained combobox or textbox. Depending on
     * the implementation, pressing Enter again, Tab, Escape, or another key
     * might switch the application back to the grid navigation mode.
     */

    // TODO: If aria-readonly is set on an element with role grid, all grid cell elements that are accessibility descendants of that grid inherit the readonly state. An author MAY override the propagated value of aria-readonly for an individual gridcell element.

    // TODO: Designate a cell as a row or column header by using either the rowheader or columnheader role in lieu of the gridcell role.

    // TODO: If a caption exists, it must be the first non-generic descendant.
  });
}
