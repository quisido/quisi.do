import type { Props, Type } from './types.js';

export default interface Instance<
  Txt,
  Child extends Instance<Txt, Child>,
  T extends Type = Type,
> {
  readonly appendChild: (instance: Child | Txt) => void;
  readonly insertBefore: (
    child: Child | Txt,
    beforeChild: Child | Txt, // | SuspenseInstance,
  ) => void;
  readonly removeChild: (instance: Child | Txt) => void;
  readonly update: (prevProps: Props[T], nextProps: Props[T]) => void;
}
