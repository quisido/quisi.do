import useCountText from '../../hooks/use-count-text';

interface Props {
  readonly placeholder?: string | undefined;
  readonly rowsCount: number;
}

interface State {
  readonly countText: string;
  readonly filteringPlaceholder: string;
}

export default function useAwsuiTableFilter({
  placeholder,
  rowsCount,
}: Props): State {
  return {
    countText: useCountText(rowsCount),
    filteringPlaceholder: placeholder ?? '...',
  };
}
