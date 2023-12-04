import { type Theme } from '@mui/material/styles';
import { type SxProps } from '@mui/system';
import { useCallback, useMemo } from 'react';
import useEvent from '../../../../../../hooks/use-event/use-event';

interface Props {
  readonly depth: number;
  readonly text: string;
  readonly url: string;
}

interface State {
  readonly handleClick: VoidFunction;
  readonly sx: SxProps<Theme>;
}

const PADDING_LEFT_OFFSET = -1;

export default function useWrapperMuiNavigationExternalLinkItem({
  depth,
  text,
  url,
}: Props): State {
  // Contexts
  const emit = useEvent();

  // States
  return {
    handleClick: useCallback((): void => {
      window.open(url, '_blank');

      emit('click', {
        category: 'navigation',
        target: '_blank',
        title: text,
        url,
      });
    }, [emit, text, url]),

    sx: useMemo(
      (): SxProps<Theme> => ({
        paddingLeft: depth + PADDING_LEFT_OFFSET,
      }),
      [depth],
    ),
  };
}
