interface Props {
  readonly label: string;
}

interface OffProps {
  readonly off: boolean;
  readonly on?: undefined;
}

interface OnProps {
  readonly off?: undefined;
  readonly on: boolean;
}

export type SwitchProps = (OffProps | OnProps) & Props;
