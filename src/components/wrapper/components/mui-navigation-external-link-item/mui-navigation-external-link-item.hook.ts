import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { useCallback, useMemo } from 'react';

interface Props {
  readonly depth: number;
  readonly url: string;
}

interface State {
  readonly handleClick: () => void;
  readonly sx: SxProps<Theme>;
}

const PADDING_LEFT_OFFSET = -1;

export default function useWrapperMuiNavigationExternalLinkItem({
  depth,
  url,
}: Readonly<Props>): State {
  return {
    handleClick: useCallback((): void => {
      window.open(url, '_blank');
    }, [url]),

    sx: useMemo(
      (): SxProps<Theme> => ({
        paddingLeft: depth + PADDING_LEFT_OFFSET,
      }),
      [depth],
    ),
  };
}
