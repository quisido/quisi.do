import type { TypographyProps } from '@mui/material/Typography';
import type { ElementType } from 'react';
import { useMemo } from 'react';

interface CurrentProps extends Partial<TypographyProps> {
  readonly component?: ElementType;
}

interface State {
  readonly currentProps: CurrentProps;
}

export default function useMuiWrapperBreadcrumb(): State {
  return {
    currentProps: useMemo((): CurrentProps => {
      return {};
      /*
      if (wrapperVariant !== 'table') {
        return {};
      }
      return {
        component: 'h2',
      };
      */
    }, []),
  };
}
