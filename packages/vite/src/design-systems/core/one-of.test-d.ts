import type { OneOf } from './one-of.js';

interface Test {
  readonly bool: boolean;
  readonly num: number;
  readonly str: string;
}

export const bool: OneOf<Test> = {
  bool: true,
  num: undefined,
  str: undefined,
};

export const num: OneOf<Test> = {
  bool: undefined,
  num: 1,
  str: undefined,
};

export const str: OneOf<Test> = {
  bool: undefined,
  num: undefined,
  str: 'test',
};
