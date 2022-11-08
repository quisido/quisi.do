import type { TypographyProps } from '@mui/material/Typography';
import type { ElementType } from 'react';
import { useMemo } from 'react';
import useWrapperVariant from '../../../../hooks/use-wrapper-variant';

interface CurrentProps extends Partial<TypographyProps> {
  readonly component?: ElementType;
}

interface State {
  readonly currentProps: CurrentProps;
}

export default function useMuiWrapperBreadcrumb(): State {
  const wrapperVariant: 'table' | 'wizard' | undefined = useWrapperVariant();

  return {
    currentProps: useMemo((): CurrentProps => {
      if (wrapperVariant !== 'table') {
        return {};
      }
      return {
        component: 'h2',
      };
    }, [wrapperVariant]),
  };
}
