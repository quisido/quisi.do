export interface MeterProps {
  readonly high?: number | undefined;
  readonly labelledBy?: string | undefined;
  readonly low?: number | undefined;
  /**
   * @default 100
   */
  readonly max?: number | undefined;
  /**
   * @default 0
   */
  readonly min?: number | undefined;
  readonly optimum?: number | undefined;
  readonly value: number;
}
