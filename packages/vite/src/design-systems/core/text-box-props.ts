export interface TextBoxProps {
  readonly label: string;
  readonly multiline?: boolean | undefined;
  readonly onChange: (value: string) => void;
  readonly value: string;
}
