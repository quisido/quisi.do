import useElementId from '../../hooks/use-element-id.js';

interface Props {
  readonly label: string | undefined;
  readonly labelledBy: string | undefined;
}

interface State {
  readonly headingId: string;
  readonly labelledBy: string | undefined;
}

export default function useForm({ label, labelledBy }: Props): State {
  const headingId: string = useElementId();

  return {
    headingId,
    labelledBy: ((): string | undefined => {
      if (label !== undefined) {
        return;
      }
      return labelledBy ?? headingId;
    })(),
  };
}
