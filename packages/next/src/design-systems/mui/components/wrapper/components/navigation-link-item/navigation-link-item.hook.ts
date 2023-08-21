import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { useCallback, useMemo } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import usePathname from '../../../../../../hooks/use-pathname';
import useEvent from '../../../../../../hooks/use-event/use-event';
import useHostname from '../../../../../../hooks/use-hostname';

interface Props {
  readonly depth: number;
  readonly path: string;
  readonly text: string;
}

interface State {
  readonly handleClick: VoidFunction;
  readonly selected: boolean;
  readonly sx: SxProps<Theme>;
}

const PADDING_LEFT_OFFSET = -1;

export default function useMuiWrapperNavigationLinkItem({
  depth,
  path,
  text,
}: Readonly<Props>): State {
  // Contexts
  const emit = useEvent();
  const hostname: string = useHostname();
  const navigate: NavigateFunction = useNavigate();
  const locationPath: string = usePathname();

  return {
    selected: path === locationPath,

    handleClick: useCallback((): void => {
      navigate(path);

      emit('click', {
        category: 'navigation',
        target: '_self',
        title: text,
        url: `${hostname}${path}`,
      });
    }, [emit, hostname, navigate, path, text]),

    sx: useMemo(
      (): SxProps<Theme> => ({
        paddingLeft: depth + PADDING_LEFT_OFFSET,
      }),
      [depth],
    ),
  };
}
