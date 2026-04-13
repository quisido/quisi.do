export interface SeparatorWidgetProps {
  /**
   * @default false
   */
  readonly disabled?: boolean | undefined;
  /**
   * @default 100
   */
  readonly max?: number | undefined;
  /**
   * @default 0
   */
  readonly min?: number | undefined;
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
  readonly value: number;
}
