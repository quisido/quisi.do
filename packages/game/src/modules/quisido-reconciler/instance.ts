export default interface Instance<Props extends object, Txt, Child> {
  readonly appendChild: (child: Child | Txt) => void;
  readonly hide: () => void;
  readonly insertBefore: (
    child: Child | Txt,
    beforeChild: Child | Txt, // | SuspenseInstance,
  ) => void;
  readonly remove?: (() => void) | undefined;
  readonly removeChild: (child: Child | Txt) => void;
  readonly resetTextContent?: (() => void) | undefined;
  readonly unhide: (props: Props) => void;

  /**
   *   This method represents the React Reconciler commit phase, instructing the
   * instance to draw to the screen.
   */
  readonly update: (prevProps: Props, nextProps: Props) => void;
}
