interface DisabledProps {
  /**
   * @default false
   */
  readonly disabled?: boolean | undefined;
  readonly readOnly?: undefined;
}

export type DisabledOrReadOnly<T> = T & (DisabledProps | ReadOnlyProps);

interface ReadOnlyProps {
  readonly disabled?: undefined;
  /**
   * @default false
   */
  readonly readOnly?: boolean | undefined;
}
