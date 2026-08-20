- Focus is set to an element within the alert dialog[^1].
- The `alertdialog` role is on the node containing both the alert message and
  the rest of the dialog, including any dialog buttons[^1].
- The dialog container element has `aria-modal` set to `true`[^1].
- The alert dialog is [modal](./modal.md). While it is shown, keyboard focus
  remains within the dialog[^1].
- The element with the `alertdialog` role has either an `aria-label` (when the
  label is not visible) or `aria-labelledby` (when the label is visible)[^1].
- The element with the `alertdialog` role has a value set for `aria-describedby`
  that refers to the element containing the alert message[^1].
- Tab moves focus to next focusable element inside the dialog. When focus is on
  the last focusable element in the dialog, Tab moves focus to the first
  focusable element in the dialog[^2].
- Shift + Tab moves focus to previous focusable element inside the dialog. When
  focus is on the first focusable element in the dialog, Shift + Tab moves focus
  to the last focusable element in the dialog[^2].
- Escape closes the dialog[^2].
- Keyboard focus cannot move to content outside the modal[^1].
- The dialog element is not a descendant of any element that has `aria-hidden`
  set to `true`[^1].

[^1]: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/

[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/examples/alertdialog/
