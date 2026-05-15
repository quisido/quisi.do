export interface SeparatorWidgetProps {
  /**
   * @default false
   */
  readonly disabled?: boolean | undefined;
  readonly label?: string | undefined;
  readonly labelledBy?: string | undefined;
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
  readonly onChange?: ((value: number) => void) | undefined;
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
  readonly value: number;
  readonly valueText?: string | undefined;
}
