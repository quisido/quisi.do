import type { ReactElement } from 'react';
import type { TextBoxProps } from '../core/text-box-props.js';

/**
 *   A text box...
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
