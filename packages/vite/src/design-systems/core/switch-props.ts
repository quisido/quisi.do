export interface SwitchProps {
  readonly label: string;
  readonly on: boolean;
  readonly onToggle: (on: boolean) => void;
}
