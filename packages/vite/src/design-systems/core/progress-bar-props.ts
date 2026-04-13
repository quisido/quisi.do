export interface ProgressBarProps {
  readonly busy: boolean;
  readonly describes?: string | undefined;
  readonly id?: string | undefined;
  readonly label: string;
  readonly max?: number | undefined;
  readonly min?: number | undefined;
  readonly value?: number | undefined;
}
