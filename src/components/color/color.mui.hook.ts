import type { Theme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { useMemo } from 'react';
import mapColorToMuiColor from './utils/map-color-to-mui-color';

export default function useMuiColor(value: 'label'): SxProps<Theme> {
  return useMemo(
    (): SxProps<Theme> => ({
      color: mapColorToMuiColor(value),
    }),
    [value],
  );
}
