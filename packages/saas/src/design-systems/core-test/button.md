- Command buttons should not have a pressed state[^1].
- When the button is focused, the Space key should activate it[^1].
- When the button is focused, the Enter key should activate it[^1].
- If activating the button does not dismiss the current context, then focus
  should remains on the button after activation[^1].
- If the button action indicates a context change, such as move to next step in
  a wizard or add another search criteria, then it should move focus to the
  starting point for that action[^1].
- If the button is activated with a shortcut key, the focus should remain in the
  context from which the shortcut key was activated. For example, if Alt + U
  were assigned to an "Up" button that moves the currently focused item in a
  list one position higher in the list, pressing Alt + U when the focus is in
  the list would not move the focus from the list[^1].
- The button has role of `button`[^1].
- The button has an accessible label. If it has no text content, it must have an
  `aria-label` or `aria-labelledby` attribute[^1].
- The button should support `aria-describedby` for its description[^1].
- When the action associated with a button is unavailable, it should have
  `aria-disabled` set to `true`.

[^1]: https://www.w3.org/WAI/ARIA/apg/patterns/button/
[^2]: https://aria-at.w3.org/report/163671
