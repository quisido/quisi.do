export interface SliderProps {
  readonly label: string;
  readonly max?: number | undefined;
  readonly min?: number | undefined;
  readonly onChange: (value: number) => void;
  /**
   * @default 'horizontal'
   */
  readonly orientation?: 'horizontal' | 'vertical' | undefined;
  readonly value: number;
}
