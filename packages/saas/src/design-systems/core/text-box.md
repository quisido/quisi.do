# Text box

A text box is type of input that allows free-form text as its value[^1].

If the `multiline` prop is `true`, the widget accepts line breaks within the
input, as in an HTML textarea. Otherwise, this is a simple text box. The
intended use is for languages that do not have a text input element, or cases in
which an element with different semantics is repurposed as a text field[^1].

Limit the children of a text box to non-interactive, entirely presentational
elements such as icons used to visually convey information that is already
exposed in an accessible manner[^1]. Examples include:

- an error icon, where the containing text box has been provided an
  `aria-invalid`, `aria-errormessage`, or both attributes;
- an icon of a user silhouette, where the text box is also visibly labeled or
  provided an accessible name of "name" or "username";
- a graphical status indicator, such as a gauge to represent characters
  remaining, which represents dynamically updating text available outside of the
  text box.

[^1]: https://w3c.github.io/aria/#textbox
