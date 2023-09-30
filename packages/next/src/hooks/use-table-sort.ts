'use client';

import { useCallback, useDeferredValue, useState } from 'react';

interface State {
  readonly ascending: boolean;
  readonly columnIndex: number;
  readonly handleSort: (columnIndex: number, ascending: boolean) => void;
}

const DEFAULT_SORT_COLUMN_INDEX = 0;

export default function useTableSort(): State {
  // States
  const [ascending, setAscending] = useState(true);
  const [columnIndex, setColumnIndex] = useState(DEFAULT_SORT_COLUMN_INDEX);

  return {
    ascending: useDeferredValue(ascending),
    columnIndex: useDeferredValue(columnIndex),

    handleSort: useCallback(
      (newColumnIndex: number, newAscending: boolean): void => {
        setAscending(newAscending);
        setColumnIndex(newColumnIndex);
      },
      [],
    ),
  };
}
