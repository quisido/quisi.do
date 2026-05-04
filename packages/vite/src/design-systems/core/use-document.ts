export interface DocumentState {
  readonly tabIndex: 0 | -1;
}

interface Props {
  readonly tabbable: boolean;
}

export default function useDocument({ tabbable }: Props): DocumentState {
  return {
    tabIndex: ((): 0 | -1 => {
      if (tabbable) {
        return 0;
      }
      return -1;
    })(),
  };
}
