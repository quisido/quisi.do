import type Instance from './instance.js';

export default interface Container<Txt, Child extends Instance<Txt, Child>> {
  readonly appendChild: (instance: Child | Txt) => void;
  readonly insertBefore: (
    child: Child | Txt,
    beforeChild: Child | Txt, // | SuspenseInstance,
  ) => void;
  readonly removeChild: (instance: Child | Txt) => void;
}
