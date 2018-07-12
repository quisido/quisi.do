import { useCallback, useMemo } from 'react';

interface Props {
  readonly active: boolean;
  readonly ascending: boolean;
  readonly onSort: (ascending: boolean) => void;
}

interface State {
  readonly direction: 'asc' | 'desc';
  readonly handleSortLabelClick: VoidFunction;
  readonly sortDirection: 'asc' | 'desc' | false;
}

export default function useMuiTableHeadCell({
  active,
  ascending,
  onSort,
}: Props): State {
  return {
    direction: useMemo((): 'asc' | 'desc' => {
      if (!active) {
        return 'asc';
      }
      if (ascending) {
        return 'asc';
      }
      return 'desc';
    }, [active, ascending]),

    handleSortLabelClick: useCallback((): void => {
      if (active) {
        onSort(!ascending);
      } else {
        onSort(true);
      }
    }, [active, ascending, onSort]),

    sortDirection: useMemo((): 'asc' | 'desc' | false => {
      if (!active) {
        return false;
      }
      if (ascending) {
        return 'asc';
      }
      return 'desc';
    }, [active, ascending]),
  };
}
