export interface ButtonProps {
  readonly children: string;
  /** @default false */
  readonly disabled?: boolean | undefined;
  readonly onClick: VoidFunction;
}
