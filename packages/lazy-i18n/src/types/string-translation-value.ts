type NumberFunction = () => number;
type StringFunction = () => string;

type StringTranslationValue =
  | NumberFunction
  | StringFunction
  | number
  | string
  | undefined;

export default StringTranslationValue;
