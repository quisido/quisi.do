export interface SearchBoxProps {
  readonly disabled?: boolean | undefined;
  readonly label: string;
  readonly onChange: (value: string) => void;
  readonly readOnly?: boolean | undefined;
  readonly required?: boolean | undefined;
  readonly value: string;
}
