import type { ReactElement } from 'react';

export interface TextBoxProps {
  readonly label: string;
  readonly multiline?: boolean | undefined;
}

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
