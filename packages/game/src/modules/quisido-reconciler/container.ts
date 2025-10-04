export default interface Container<Txt, Child> {
  readonly appendChild: (child: Child | Txt) => void;
  readonly clear: () => void;
  readonly insertBefore: (
    child: Child | Txt,
    beforeChild: Child | Txt, // | SuspenseInstance,
  ) => void;
  readonly removeChild: (child: Child | Txt) => void;
}
