export interface LabelProps {
  readonly label: string;
  readonly labelledBy?: undefined;
}

export interface LabelledByProps {
  readonly label?: undefined;
  readonly labelledBy: string;
}
