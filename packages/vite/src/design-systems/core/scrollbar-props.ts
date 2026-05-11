export interface ScrollbarProps {
  readonly controls?: string | undefined;
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
   * @default 'vertical'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
  readonly onChange?: ((value: number) => void) | undefined;
  readonly value: number;
  readonly valueText?: string | undefined;
}
