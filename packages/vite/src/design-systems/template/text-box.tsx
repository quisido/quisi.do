import type { ReactElement } from 'react';
import type { TextBoxProps } from '../shared/text-box-props.js';

/**
 *   A `TextBox` component is an input that accepts free-form text as its
 * value. When `aria-multiline` is true, it behaves like a multiline text
 * field.
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
