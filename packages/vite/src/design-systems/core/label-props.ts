export type LabelProps =
  | {
      readonly label: string;
      readonly labelledBy?: undefined;
    }
  | {
      readonly label?: undefined;
      readonly labelledBy: string;
    };
