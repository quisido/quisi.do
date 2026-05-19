interface DisabledProps {
  /**
   * @default false
   */
  readonly disabled?: boolean | undefined;
  readonly readOnly?: false | undefined;
}

export type DisabledOrReadOnlyProps = DisabledProps | ReadOnlyProps;

interface ReadOnlyProps {
  readonly disabled?: false | undefined;
  /**
   * @default false
   */
  readonly readOnly?: boolean | undefined;
}
