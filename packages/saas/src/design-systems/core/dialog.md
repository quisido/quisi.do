# Dialog

A dialog is a descendant window of the primary window of a web application (not
to be confused with an [application component](./application.md)). For HTML
pages, the primary application window is the entire web document[^1].

Dialogs are often used to prompt the user to enter or respond to information, or
can represent content related to understanding or modifying the content of the
primary application window. A dialog that is designed to interrupt workflow and
prevent users from interacting with the primary web application is usually
[modal](./modal.md). See related [alert dialog](./alert-dialog.md). A dialog
that allows for the user to switch between interacting with the content of the
primary web application and the content the dialog is usually modeless (i.e.
non-modal). Use the `aria-modal` attribute, and constrain focus to dialogs[^1].

Provide an accessible name for a dialog with the `aria-label` or
`aria-labelledby` attribute[^1].

Ensure that all dialogs (both modal and non-modal) have at least one focusable
descendant element[^1].

Focus an element in the modal dialog when it is displayed[^1].

Constrain keyboard focus to focusable elements within a modal dialog, until
dismissed[^1].

Provide a dialog an accessible description, with the `aria-describedby`
attribute, for instances where ypi have set initial keyboard focus on an element
that follows content that outlines the purpose of the dialog[^1].

Use `aria-describedby`, rather than `aria-description`, to provide descriptions
to dialogs. While `aria-description` could be used to provide an accessible
description for a dialog, it will provide a better and more consistent user
experience to reference visible content that can also be independently read by
all users. Doing so will help ensure important descriptive information is less
likely to be missed[^1].

A dialog is a window overlaid on either the primary window or another dialog
window. Windows under a modal dialog are inert. That is, users cannot interact
with content outside an active dialog window. Inert content outside an active
dialog is typically visually obscured or dimmed so it is difficult to discern,
and in some implementations, attempts to interact with the inert content cause
the dialog to close[^2].

Like non-modal dialogs, modal dialogs contain their tab sequence. That is, Tab
and Shift + Tab do not move focus outside the dialog. However, unlike most
non-modal dialogs, modal dialogs do not provide means for moving keyboard focus
outside the dialog window without closing the dialog[^2].

An [alert dialog](./alert-dialog.md) is a special-case dialog role designed
specifically for dialogs that divert users' attention to a brief, important
message[^2].

[^1]: https://w3c.github.io/aria/#dialog
[^2]: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
