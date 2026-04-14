import type { ReactElement } from 'react';
import type { TextBoxProps } from '../core/text-box-props.js';

/**
 *   A text box... A type of input that allows free-form text as its value.

If the aria-multiline attribute is true, the widget accepts line breaks within the input, as in an HTML textarea. Otherwise, this is a simple text box. The intended use is for languages that do not have a text input element, or cases in which an element with different semantics is repurposed as a text field.

Authors MUST limit the children of a textbox to non-interactive, entirely presentational elements such as icons used to visually convey information that is already exposed in an accessible manner. Examples include:

an error icon, where the containing textbox has been provided an aria-invalid, aria-errormessage, or both attributes;
an icon of a user silhouette, where the textbox is also visibly labeled or provided an accessible name of "name" or "username"; and
a graphical status indicator, such as a gauge to represent characters remaining, which represents dynamically updating text available outside of the textbox.

In most user agent implementations, the default behavior of the ENTER or RETURN key is different between the single-line and multi-line text fields in HTML. When user has focus in a single-line <input type="text"> element, the keystroke usually submits the form. When user has focus in a multi-line <textarea> element, the keystroke inserts a line break. The WAI-ARIA textbox role differentiates these types of boxes with the aria-multiline attribute, so authors are advised to be aware of this distinction when designing the field.
 * @see {@link https://w3c.github.io/aria/#textbox | WAI-ARIA `textbox` role}
 */
export default function TextBox({
  label,
  multiline = false,
}: TextBoxProps): ReactElement {
  let control: ReactElement = <input type="text" />;

  if (multiline) {
    control = <textarea />;
  }

  return (
    <label>
      {label}
      {control}
    </label>
  );
}
