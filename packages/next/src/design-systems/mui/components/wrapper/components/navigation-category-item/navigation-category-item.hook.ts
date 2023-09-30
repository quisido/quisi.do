'use client';

import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';
import { useCallback, useMemo, useState } from 'react';

interface Props {
  readonly defaultExpanded: boolean;
  readonly depth: number;
}

interface State {
  readonly dense: boolean;
  readonly expanded: boolean;
  readonly handleClick: VoidFunction;
  readonly sx: SxProps<Theme>;
}

const PADDING_LEFT_OFFSET = -1;
const ROOT_DEPTH = 1;
const toggle = (old: boolean): boolean => !old;

export default function useWrapperMuiNavigationCategoryItem({
  defaultExpanded,
  depth,
}: Readonly<Props>): State {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return {
    dense: depth !== ROOT_DEPTH,
    expanded,

    handleClick: useCallback((): void => {
      setExpanded(toggle);
    }, []),

    sx: useMemo(
      (): SxProps<Theme> => ({
        paddingLeft: depth + PADDING_LEFT_OFFSET,
      }),
      [depth],
    ),
  };
}
