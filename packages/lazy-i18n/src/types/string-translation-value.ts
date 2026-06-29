type NumberFunction = () => number;
type StringFunction = () => string;

export type StringTranslationValue =
  | NumberFunction
  | StringFunction
  | number
  | string
  | undefined;
