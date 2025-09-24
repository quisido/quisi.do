export default interface Container<Txt, Child> {
  readonly appendChild: (instance: Child | Txt) => void;
  readonly clear: () => void;
  readonly insertBefore: (
    child: Child | Txt,
    beforeChild: Child | Txt, // | SuspenseInstance,
  ) => void;
  readonly removeChild: (instance: Child | Txt) => void;
}
