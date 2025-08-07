import type { Stringifiable } from './stringifiiable.js';

export enum ObjectKey {
  Children = 'c',
  State = 's',
}

export interface StringifiableGameObject {
  [ObjectKey.Children]: Readonly<Record<string, string>>;
  [ObjectKey.State]: Readonly<Record<string, Stringifiable>>;
}
