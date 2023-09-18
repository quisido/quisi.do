import { ComponentType, ReactNode } from 'react';

type NumberFunction = () => number;
type StringFunction = () => string;

type ReactNodeTranslationValue =
  | ComponentType<unknown>
  | NumberFunction
  | ReactNode
  | StringFunction
  | number
  | string
  | undefined;

export default ReactNodeTranslationValue;
