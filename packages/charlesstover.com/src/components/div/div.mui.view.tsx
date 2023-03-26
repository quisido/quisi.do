import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
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
  if (isDefined(className)) {
    optionalProps.className = className;
  }

  if (isDefined(display)) {
    optionalProps.display = display;
  }

  if (isDefined(flexDirection)) {
    optionalProps.flexDirection = flexDirection;
  }

  if (isDefined(flexWrap)) {
    optionalProps.flexWrap = flexWrap;
  }

  if (isDefined(element)) {
    optionalProps.component = element;
  }

  if (isDefined(mb)) {
    optionalProps.mb = mb;
  }

  if (isDefined(ml)) {
    optionalProps.ml = ml;
  }

  if (isDefined(mr)) {
    optionalProps.mr = mr;
  }

  if (isDefined(mt)) {
    optionalProps.mt = mt;
  }

  if (isDefined(style)) {
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
