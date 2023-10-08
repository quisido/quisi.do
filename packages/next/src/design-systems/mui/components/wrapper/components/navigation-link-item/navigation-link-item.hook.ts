'use client';

import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { useRouter } from 'next/navigation.js';
import { useEffect, useMemo } from 'react';
import useEffectEvent from '../../../../../../hooks/use-effect-event';
import useEvent from '../../../../../../hooks/use-event/use-event';
import useHostname from '../../../../../../hooks/use-hostname';
import usePathname from '../../../../../../hooks/use-pathname';

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
}: Props): State {
  // Contexts
  const emit = useEvent();
  const hostname: string = useHostname();
  const locationPath: string = usePathname();
  const router = useRouter();

  useEffect((): void => {
    router.prefetch(path);
  }, [path, router]);

  return {
    selected: path === locationPath,

    handleClick: useEffectEvent((): void => {
      router.push(path);

      emit('click', {
        category: 'navigation',
        target: '_self',
        title: text,
        url: `${hostname}${path}`,
      });
    }),

    sx: useMemo(
      (): SxProps<Theme> => ({
        paddingLeft: depth + PADDING_LEFT_OFFSET,
      }),
      [depth],
    ),
  };
}
