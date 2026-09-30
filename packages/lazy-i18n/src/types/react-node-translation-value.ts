import { type ComponentType, type ReactNode } from 'react';

type NumberFunction = () => number;
type StringFunction = () => string;

export type ReactNodeTranslationValue =
  | ComponentType<unknown>
  | NumberFunction
  | ReactNode
  | StringFunction
  | number
  | string
  | undefined;
