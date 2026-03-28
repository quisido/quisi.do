import type { ReactElement } from 'react';

export interface TextBoxProps {
  readonly label: string;
  readonly multiline?: boolean | undefined;
}

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
