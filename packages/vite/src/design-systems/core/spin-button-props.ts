export interface SpinButtonProps {
  readonly label: string;
  readonly max?: number | undefined;
  readonly min?: number | undefined;
  readonly name?: string | undefined;
  readonly onChange: (value: number) => void;
  readonly step?: number | undefined;
  readonly value: number;
}
