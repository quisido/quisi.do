import type SelectOption from '../../../../types/select-option';
import useSortOptions from '../../hooks/use-sort-options';

interface State {
  readonly sortOptions: readonly SelectOption[];
}

export default function usePublicationsHeader(): State {
  return {
    sortOptions: useSortOptions(),
  };
}
