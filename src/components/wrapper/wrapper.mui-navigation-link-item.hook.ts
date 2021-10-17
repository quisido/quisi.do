import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import type { History } from 'history';
import { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';

interface Props {
  readonly depth: number;
  readonly path: string;
}

interface State {
  readonly handleClick: () => void;
  readonly selected: boolean;
  readonly sx: SxProps<Theme>;
}

const PADDING_LEFT_OFFSET = -1;

export default function useWrapperMuiNavigationLinkItem({
  depth,
  path,
}: Readonly<Props>): State {
  const history: History<unknown> = useHistory();
  const { pathname: locationPath } = useLocation();

  return {
    selected: path === locationPath,

    handleClick: useCallback((): void => {
      history.push(path);
    }, [history, path]),

    sx: useMemo(
      (): SxProps<Theme> => ({
        paddingLeft: depth + PADDING_LEFT_OFFSET,
      }),
      [depth],
    ),
  };
}
