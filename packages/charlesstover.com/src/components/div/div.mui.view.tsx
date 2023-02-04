import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
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
  if (findDefined(className)) {
    optionalProps.className = className;
  }

  if (findDefined(display)) {
    optionalProps.display = display;
  }

  if (findDefined(flexDirection)) {
    optionalProps.flexDirection = flexDirection;
  }

  if (findDefined(flexWrap)) {
    optionalProps.flexWrap = flexWrap;
  }

  if (findDefined(element)) {
    optionalProps.component = element;
  }

  if (findDefined(mb)) {
    optionalProps.mb = mb;
  }

  if (findDefined(ml)) {
    optionalProps.ml = ml;
  }

  if (findDefined(mr)) {
    optionalProps.mr = mr;
  }

  if (findDefined(mt)) {
    optionalProps.mt = mt;
  }

  if (findDefined(style)) {
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
