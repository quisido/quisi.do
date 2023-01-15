import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import useMuiDiv from './div.mui.hook';
import type Props from './types/props';

export default function MuiDiv({
  children,
  className,
  display,
  element,
  flexDirection,
  flexWrap,
  float,
  justifyContent,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  textAlign,
}: Readonly<Props>): ReactElement {
  const { mb, ml, mr, mt, style } = useMuiDiv({
    float,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
  });

  const optionalProps: BoxProps = {};
  if (filterByDefined(className)) {
    optionalProps.className = className;
  }

  if (filterByDefined(display)) {
    optionalProps.display = display;
  }

  if (filterByDefined(flexDirection)) {
    optionalProps.flexDirection = flexDirection;
  }

  if (filterByDefined(flexWrap)) {
    optionalProps.flexWrap = flexWrap;
  }

  if (filterByDefined(element)) {
    optionalProps.component = element;
  }

  if (filterByDefined(mb)) {
    optionalProps.mb = mb;
  }

  if (filterByDefined(ml)) {
    optionalProps.ml = ml;
  }

  if (filterByDefined(mr)) {
    optionalProps.mr = mr;
  }

  if (filterByDefined(mt)) {
    optionalProps.mt = mt;
  }

  if (filterByDefined(style)) {
    optionalProps.style = style;
  }

  return (
    <Box
      justifyContent={justifyContent}
      margin={0}
      padding={0}
      textAlign={textAlign}
      {...optionalProps}
    >
      {children}
    </Box>
  );
}
