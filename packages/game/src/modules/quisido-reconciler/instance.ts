export default interface Instance<
  Type extends string,
  Props extends Record<Type, object>,
  Txt,
  Child extends Instance<Type, Props, Txt, Child>,
  InstanceType extends Type = Type,
> {
  readonly appendChild: (instance: Child | Txt) => void;
  readonly hide: () => void;
  readonly insertBefore: (
    child: Child | Txt,
    beforeChild: Child | Txt, // | SuspenseInstance,
  ) => void;
  readonly resetTextContent: () => void;
  readonly removeChild: (instance: Child | Txt) => void;
  readonly unhide: (props: Props[InstanceType]) => void;
  readonly update: (
    prevProps: Props[InstanceType],
    nextProps: Props[InstanceType],
  ) => void;
}
