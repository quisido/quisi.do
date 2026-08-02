# Combobox

A combobox is an input that controls another element, such as a listbox or grid,
that can dynamically pop up to help the user set the value of the input[^1].

A combobox functionally combines a named input field with the ability to assist
value selection via a supplementary popup element. Combobox input is either a
single-line text field that supports editing and typing or an element that only
displays the current value of the combobox. If the combobox supports text input
and provides autocompletion behavior as described in `aria-autocomplete`, set
`aria-autocomplete` on the combobox element to the value that corresponds to the
provided behavior[^1].

Typically, the initial state of a combobox is collapsed. In the collapsed state,
only the combobox element and a separate, optional popup control button are
visible. A combobox is said to be expanded when both the combobox element
showing its current value and its associated popup element are visible. Set
`aria-expanded` to `true` on an element with role combobox when it is expanded
and `false` when it is collapsed[^1].

Elements with the role combobox have an implicit `aria-haspopup` value of
`listbox`. If the combobox popup element has a role other than `listbox`,
specify an `aria-haspopup` value of `tree`, `grid`, `menu`, or `dialog` that
corresponds to the role of its popup[^1].

If the user interface includes an additional icon that allows the visibility of
the popup to be controlled via pointer and touch events, ensure that element has
role `button`, that it is focusable but not included in the page Tab sequence,
and that it is not a descendant of the element with role `combobox`. In
addition, to be keyboard accessible, provide keyboard mechanisms for moving
focus between the combobox element and elements contained in the popup. For
example, one common convention is that Down Arrow moves focus from the input to
the first focusable descendant of the popup element. If the popup element
supports `aria-activedescendant`, in lieu of moving focus, such keyboard
mechanisms can control the value of `aria-activedescendant` on the combobox
element. When a descendant of the popup element is active, set
`aria-activedescendant` on the combobox to a value that refers to the active
element within the popup while focus remains on the combobox element[^1].

A combobox is an input widget that has an associated popup. The popup enables
users to choose a value for the input from a collection. The popup may be a
`listbox`, `grid`, `tree`, or `dialog`[^2].

In some implementations, the popup presents allowed values, while in other
implementations, the popup presents suggested values. Many implementations also
include a third optional element -- a graphical Open button adjacent to the
combobox, which indicates availability of the popup. Activating the Open button
displays the popup if suggestions are available[^2].

The combobox pattern supports several optional behaviors. The one that most
shapes interaction is text input. Some comboboxes allow users to type and edit
text in the combobox and others do not. If a combobox does not support text
input, it is referred to as select-only, meaning the only way users can set its
value is by selecting a value in the popup. For example, in some browsers, an
HTML `select` element with `size="1"` is presented to assistive technologies as
a combobox. Alternatively, if a combobox supports text input, it is referred to
as editable. An editable combobox may either allow users to input any arbitrary
value, or it may restrict its value to a discrete set of allowed values, in
which case typing input serves to filter suggestions presented in the popup[^2].

The popup is hidden by default, i.e. the default state is collapsed. The
conditions that trigger expansion -- display of the popup -- are specific to
each implementation. Some possible conditions that trigger expansion
include[^2]:

- It is displayed when the Down Arrow key is pressed or the Open button is
  activated. Optionally, if the combobox is editable and contains a string that
  does not match an allowed value, expansion does not occur.
- It is displayed when the combobox receives focus even if the combobox is
  editable and empty.
- If the combobox is editable, the popup is displayed only if a certain number
  of characters are typed in the combobox and those characters match some
  portion of one of the suggested values.

Combobox widgets are useful for acquiring user input in either of two
scenarios[^2]:

- The value must be one of a predefined set of allowed values, e.g. a location
  field must contain a valid location name. Note that the `listbox` and `menu`
  button patterns are also useful in this scenario; differences between combobox
  and alternative patterns are described below.
- An arbitrary value is allowed, but it is advantageous to suggest possible
  values to users. For example, a search field may suggest similar or previous
  searches to save the user time.

The nature of possible values presented by a popup and the way they are
presented is called the autocomplete behavior. Comboboxes can have one of four
forms of autocomplete[^2]:

- **No autocomplete:** The combobox is editable, and when the popup is
  triggered, the suggested values it contains are the same regardless of the
  characters typed in the combobox. For example, the popup suggests a set of
  recently entered values, and the suggestions do not change as the user types.
- **List autocomplete with manual selection:** When the popup is triggered, it
  presents suggested values. If the combobox is editable, the suggested values
  complete or logically correspond to the characters typed in the combobox. The
  character string the user has typed will become the value of the combobox
  unless the user selects a value in the popup.
- **List autocomplete with automatic selection:** The combobox is editable, and
  when the popup is triggered, it presents suggested values that complete or
  logically correspond to the characters typed in the combobox, and the first
  suggestion is automatically highlighted as selected. The automatically
  selected suggestion becomes the value of the combobox when the combobox loses
  focus unless the user chooses a different suggestion or changes the character
  string in the combobox.
- **List with inline autocomplete:** This is the same as list with automatic
  selection with one additional feature. The portion of the selected suggestion
  that has not been typed by the user, a completion string, appears inline after
  the input cursor in the combobox. The inline completion string is visually
  highlighted and has a selected state.

If a combobox is editable and has any form of list autocomplete, the popup may
appear and disappear as the user types. For example, if the user types a two
character string that triggers five suggestions to be displayed but then types a
third character that forms a string that does not have any matching suggestions,
the popup may close and, if present, the inline completion string
disappears[^2].

Two other widgets that are also visually compact and enable users to make a
single choice from a set of discrete choices are `listbox` and menu button. One
feature that distinguishes combobox from both `listbox` and menu button is that
the user's choice can be presented as a value in an editable field, which gives
users the ability to select some or all of the value for copying to the
clipboard. Comboboxes and menu buttons can be implemented so users can explore
the set of allowed choices without losing a previously made choice. That is,
users can navigate the set of available choices in a combobox popup or menu and
then press escape, which closes the popup or menu without changing previous
input. In contrast, navigating among options in a single-select listbox
immediately changes its value, and Escape does not provide an undo mechanism.
Comboboxes and listboxes can be marked as required with `aria-required="true"`,
and they have an accessible name that is distinct from their value. Thus, when
assistive technology users focus either a combobox or listbox in its default
state, they can perceive both a name and value for the widget. However, a menu
button cannot be marked required, and while it has an accessible name, it does
not have a value so is not suitable for conveying the user's choice in its
collapsed state[^2].

Selection follows focus in the listbox; the listbox allows only one suggested
value to be selected at a time for the combobox value[^2].

[^1]: https://w3c.github.io/aria/#combobox
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
