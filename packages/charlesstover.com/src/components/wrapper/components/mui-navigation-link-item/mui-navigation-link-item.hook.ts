import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { useCallback, useMemo } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
  readonly depth: number;
  readonly path: string;
}

interface State {
  readonly handleClick: VoidFunction;
  readonly selected: boolean;
  readonly sx: SxProps<Theme>;
}

const PADDING_LEFT_OFFSET = -1;

export default function useWrapperMuiNavigationLinkItem({
  depth,
  path,
}: Readonly<Props>): State {
  const { pathname: locationPath } = useLocation();
  const navigate: NavigateFunction = useNavigate();

  return {
    selected: path === locationPath,

    handleClick: useCallback((): void => {
      navigate(path);
    }, [navigate, path]),

    sx: useMemo(
      (): SxProps<Theme> => ({
        paddingLeft: depth + PADDING_LEFT_OFFSET,
      }),
      [depth],
    ),
  };
}
