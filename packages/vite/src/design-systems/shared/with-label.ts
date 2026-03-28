interface LabelProps {
  readonly label: string;
  readonly labelledBy?: undefined;
}

interface LabelledByProps {
  readonly label?: undefined;
  readonly labelledBy: string;
}

export type WithLabel<T> = T & (LabelProps | LabelledByProps);
