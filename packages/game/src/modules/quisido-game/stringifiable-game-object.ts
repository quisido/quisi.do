import type { Stringifiable } from './stringifiable.js';

export enum ObjectKey {
  Children = 'c',
  State = 's',
}

export interface StringifiableGameObject {
  [ObjectKey.Children]: Record<string, string>;
  [ObjectKey.State]: Record<string, Stringifiable>;
}
