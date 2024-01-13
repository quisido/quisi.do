import type SelectOption from '../../../../types/select-option.js';
import useSortOptions from '../../hooks/use-sort-options.js';

interface State {
  readonly sortOptions: readonly SelectOption[];
}

export default function usePublicationsHeader(): State {
  return {
    sortOptions: useSortOptions(),
  };
}
