interface Props {
  readonly children: string;
}

export default function I18n({ children }: Props): string {
  return children;
}
