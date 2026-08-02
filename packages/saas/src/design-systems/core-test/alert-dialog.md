- Focus is set to an element within the alert dialog.
- The `alertdialog` role is on the node containing both the alert message and
  the rest of the dialog, including any dialog buttons[^1].
- The dialog container element has `aria-modal` set to `true`.
- The alert dialog is [modal](./modal.md). While it is shown, keyboard and mouse
  interactions only operate within the dialog.
- The element with the `alertdialog` role has either an `aria-label` (when the
  label is not visible) or `aria-labelledby` (when the label is visible)[^1].
- The element with the `alertdialog` role has a value set for `aria-describedby`
  that refers to the element containing the alert message[^1].
- Focus should not automatically be set to a destructive action that cannot be
  undone[^1].
- Disabled buttons should be keyboard navigable.
- Tab moves focus to next focusable element inside the dialog. When focus is on
  the last focusable element in the dialog, Tab moves focus to the first
  focusable element in the dialog[^2].
- Shift + Tab moves focus to previous focusable element inside the dialog. When
  focus is on the first focusable element in the dialog, Shift + Tab moves focus
  to the last focusable element in the dialog[^2].
- Escape closes the dialog[^2].
- Users must be prevented from interacting in any way with content outside of
  the modal[^1].
- Visual styling obscures the content outside of the modal[^1].
- The dialog element is not a descendant of any element that has `aria-hidden`
  set to `true`[^1].

[^1]: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/examples/alertdialog/
