- The cells of a grid have role `gridcell`[^1].
- You may use the `rowheader` or `columnheader` role to designate a cell as a
  row or column header in lieu of the `gridcell` role[^1].
- Elements with role `gridcell`, `columnheader`, or `rowheader` must be
  accessibility children of elements with role `row`, which are in turn are
  accessibility children of an element with role `rowgroup` or `grid`[^1].
- Manage focus of descendants[^1].
- When a user is navigating the grid content with a keyboard, set focus as
  follows[^1]:
  - If a `gridcell` contains a single interactive widget that will not consume
    arrow key presses when it receives focus, such as a checkbox, button, or
    link, set focus on the interactive element contained in that cell. This
    allows the contained widget to be directly operable.
  - Otherwise, ensure the element that receives focus is a `gridcell`,
    `rowheader`, or `columnheader` element.
- Provide a mechanism for changing to an interaction or edit mode that allows
  users to navigate and interact with content contained inside a focusable cell
  if that focusable cell contains any of the following[^1]:
  - a widget that requires arrow keys to operate, e.g. a combobox or radio group
  - multiple interactive elements
  - editable content
- Indicate that a focusable grid cell is selectable as the object of an action
  with the `aria-selected` attribute[^1].
- If the grid allows multiple grid cells to be selected, the grid should have a
  `aria-multiselectable` value of `true`[^1].
- Provide an accessible name for a grid, which can be done with the `aria-label`
  or `aria-labelledby` attribute.

[^1]: https://w3c.github.io/aria/#grid
[^2]: https://aria-at.w3.org/report/163680
