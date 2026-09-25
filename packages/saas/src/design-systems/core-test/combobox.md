- The combobox exposes a named, editable `combobox` value with list
  autocomplete[^1][^2].
- The combobox is in the page `Tab` sequence. Its popup, popup options, and
  separate popup-control button are excluded from that sequence[^1].
- `aria-expanded` is `true` exactly while the popup is visible, and
  `aria-controls` identifies the controlled `listbox` popup[^1][^2].
- Only matching suggestions are exposed as `option` descendants while the
  popup is expanded[^1].
- `Down Arrow` and `Up Arrow` open the popup and activate the first and last
  matching options, respectively[^1].
- Pointer and arrow-key navigation identify the active option with
  `aria-activedescendant` while DOM focus remains on the combobox[^1][^2].
- Pointer activation selects an option, and `Tab` commits the active option
  before moving focus away[^1].
- Typing filters suggestions and exposes inline completion through the input
  value; unmatched input remains available without exposing an empty
  popup[^1].
- `Escape` closes the popup and restores the previously committed value[^1].
- A separate popup-control button toggles the popup without changing the
  current value[^1].
- Controlled value changes remain synchronized with the displayed input
  value[^2].
- Disabled and read-only comboboxes expose their state and do not open their
  popup in response to editing interaction[^2].
- When focus is in the combobox[^1]:
  - If the popup is available, `Down Arrow` moves focus into the popup:
    - If the autocomplete behavior automatically selected a suggestion before
      `Down Arrow` was pressed, focus is placed on the suggestion following the
      automatically selected suggestion.
    - Otherwise, places focus on the first focusable element in the popup.
  - If the popup is available, `Up Arrow` places focus on the last focusable
    element in the popup.
  - `Escape` dismisses the popup if it is visible. If the popup is hidden before
    `Escape` is pressed, it clears the combobox.
  - If the combobox is editable and an autocomplete suggestion is selected in
    the popup, `Enter` accepts the suggestion either by placing the input cursor
    at the end of the accepted value in the combobox or by performing a default
    action on the value. For example, in a messaging application, the default
    action may be to add the accepted value to a list of message recipients and
    then clear the combobox so the user can add another recipient.
  - If the combobox is editable, typing sets characters in the combobox. Invalid
    characters may be prevented.
  - If the combobox is not editable, typing moves focus to a value that starts
    with the typed characters.
  - If the combobox is editable, it supports standard single line text editing
    keys appropriate for the device platform.
  - If the popup is available but not displayed, `Alt` + `Down Arrow` displays
    the popup without moving focus.
  - If the popup is displayed, `Alt` + `Up Arrow` returns focus from the popup
    to the combobox. If the popup did not contain focus, it closes the popup.
- When focus is in a `listbox` popup[^2]:
  - `Enter` accepts the focused option in the listbox by closing the popup,
    placing the accepted value in the combobox, and if the combobox is editable,
    placing the input cursor at the end of the value.
  - `Escape` closes the popup and returns focus to the combobox. If the combobox
    is editable, it clears the contents of the combobox.
  - `Down Arrow` moves focus to and selects the next option. If focus is on the
    last option, it returns focus to the combobox.
  - `Up Arrow` moves focus to and selects the previous option. If focus is on
    the first option, it returns focus to the combobox.
  - If the combobox is editable, `Right Arrow` returns focus to the combobox
    without closing the popup and moves the input cursor one character to the
    right. If the input cursor is on the right-most character, the cursor does
    not move.
  - If the combobox is editable, `Left Arrow` returns focus to the combobox
    without closing the popup and moves the input cursor one character to the
    left. If the input cursor is on the left-most character, the cursor does not
    move.
  - `Home` either moves focus to and selects the first option or, if the
    combobox is editable, returns focus to the combobox and places the cursor on
    the first character.
  - `End` either moves focus to the last option or, if the combobox is editable,
    returns focus to the combobox and places the cursor after the last
    character.
  - If the combobox is editable, typing returns the focus to the combobox
    without closing the popup and types the character. If the combobox is not
    editable, typing moves focus to the next option with a name that starts with
    the characters typed.
  - If the combobox is editable, `Backspace` returns focus to the combobox and
    deletes the character prior to the cursor.
  - If the combobox is editable, `Delete` returns focus to the combobox, removes
    the selected state if a suggestion was selected, and removes the inline
    autocomplete string if present.
- When focus is in a `grid` popup[^2]:
  - `Enter` accepts the currently selected suggested value by closing the popup,
    placing the selected value in the combobox, and if the combobox is editable,
    placing the input cursor at the end of the value.
  - `Escape` closes the popup and returns focus to the combobox. If the combobox
    is editable, it clears the contents of the combobox.
  - `Right Arrow` moves focus one cell to the right. If focus is on the
    right-most cell in the row, focus moves to the first cell in the following
    row. If focus is on the last cell in the grid, it returns focus to the
    combobox.
  - `Left Arrow` moves focus one cell to the left. If focus is on the left-most
    cell in the row, focus moves to the last cell in the previous row. If focus
    is on the first cell in the grid, it returns focus to the combobox.
  - `Down Arrow` moves focus one cell down. If focus is in the last row of the
    grid, it returns focus to the combobox.
  - `Up Arrow` moves focus one cell up. If focus is in the first row of the
    grid, it returns focus to the combobox.
  - `Page Down` moves focus down an author-determined number of rows, typically
    scrolling so the bottom row in the currently visible set of rows becomes one
    of the first visible rows. If focus is in the last row of the grid, focus
    does not move.
  - `Page Up` moves focus up an author-determined number of rows, typically
    scrolling so the top row in the currently visible set of rows becomes one of
    the last visible rows. If focus is in the first row of the grid, focus does
    not move.
  - If the combobox is editable, `Home` returns focus to the combobox and places
    the cursor on the first character.
  - If the combobox is not editable, `Home` moves focus to the first cell in the
    row that contains focus. Or, if the grid has fewer than three cells per row
    or multiple suggested values per row, focus moves to the first cell in the
    grid.
  - If the combobox is editable, `End` returns focus to the combobox and places
    the cursor after the last character.
  - If the combobox is not editable, `End` moves focus to the last cell in the
    row that contains focus. Or, if the grid has fewer than three cells per row
    or multiple suggested values per row, focus may move to the last cell in the
    grid.
  - `Control` + `Home` moves focus to the first row.
  - `Control` + `End` moves focus to the last row.
  - If the combobox is editable, typing returns the focus to the combobox
    without closing the popup and types the character.
  - If the combobox is editable, `Backspace` returns focus to the combobox and
    deletes the character prior to the cursor.
  - If the combobox is editable, `Delete` returns focus to the combobox, removes
    the selected state if a suggestion was selected, and removes the inline
    autocomplete string if present.
- Grid popups allows only one suggested value to be selected at a time for the
  combobox value[^2].
- If a grid popup's suggested value is represented by a single cell[^2]:
  - Selection follows focus so that the cell containing focus is selected.
  - Horizontal arrow key navigation typically wraps from one row to another.
  - Vertical arrow key navigation typically wraps from one column to another.
- If a grid popup's suggested value is represented by all cells in a row[^2]:
  - Either the row containing focus is selected or a cell containing a suggested
    value is selected when any cell in the same row contains focus.
  - Horizontal key navigation may wrap from one row to another.
  - Vertical arrow key navigation does not wrap from one column to another.

[^1]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

[^2]: https://w3c.github.io/aria/#combobox
