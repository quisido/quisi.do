# Grid

A grid is a composite widget containing a collection of one or more rows with
one or more cells where some or all cells in the grid are focusable by using
methods of two-dimensional navigation, such as directional arrow keys[^1].

Grids do not imply a specific visual, e.g. tabular, presentation. It describes
relationships among elements. It can be used for purposes as simple as grouping
a collection of checkboxes or navigation links or as complex as creating a
full-featured spreadsheet application[^1].

Provide a mechanism for changing to an interaction or edit mode that allows
users to navigate and interact with content contained inside a focusable cell if
that focusable cell contains any of the following[^1]:

- a widget that requires arrow keys to operate, e.g. a combobox or radio group
- multiple interactive elements
- editable content

For example, if a cell in a spreadsheet contains a combobox or editable text,
the Enter key might be used to activate a cell interaction or editing mode when
that cell has focus so the directional arrow keys can be used to operate the
contained combobox or text box. Depending on the implementation, pressing Enter
again, Tab, Escape, or another key might switch the application back to the grid
navigation mode[^1].

You may use a grid cell to display the result of a formula, which could be
editable by the user. In a spreadsheet application, for example, a grid cell
might show a value calculated from a formula until the user activates the grid
cell for editing when a text box appears in the grid cell containing the formula
in an editable state[^1].

In a grid that provides cell content editing functions, if the content of a
focusable grid cell element is not editable, set `aria-readonly` to `true` on
the grid cell. However, the value of `aria-readonly`, whether specified for a
grid or individual cells, only indicates whether the content contained in cells
is editable. It does not represent availability of functions for navigating or
manipulating the grid itself[^1].

An unspecified value for `aria-readonly` does not imply that a grid or a grid
cell contains editable content. For example, if a grid presents a collection of
elements that are not editable, such as a collection of link elements
representing dates in a date picker, it is not necessary for the author to
specify a value for `aria-readonly`[^1].

[^1]: https://w3c.github.io/aria/#grid
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/grid/
[^3]: https://www.w3.org/WAI/ARIA/apg/practices/grid-and-table-properties/
