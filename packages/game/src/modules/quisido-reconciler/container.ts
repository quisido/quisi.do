import type Instance from './instance.js';

export default interface Container<
  Type extends string,
  Props extends Record<Type, object>,
  Txt,
  Child extends Instance<Type, Props, Txt, Child>,
> {
  readonly appendChild: (instance: Child | Txt) => void;
  readonly clear: () => void;
  readonly insertBefore: (
    child: Child | Txt,
    beforeChild: Child | Txt, // | SuspenseInstance,
  ) => void;
  readonly removeChild: (instance: Child | Txt) => void;
}
