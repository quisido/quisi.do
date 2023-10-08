import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/div';
import useDiv from './div.hook';

export default function MuiDiv({
  children,
  className,
  display,
  element,
  flexDirection,
  flexWrap,
  float,
  gap: gapProp,
  justifyContent,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  textAlign,
}: Props): ReactElement {
  const {
    gap: gapState,
    mb,
    ml,
    mr,
    mt,
    style,
  } = useDiv({
    float,
    gap: gapProp,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
  });

  const optionalProps: BoxProps = {};
  if (typeof className !== 'undefined') {
    optionalProps.className = className;
  }

  if (typeof display !== 'undefined') {
    optionalProps.display = display;
  }

  if (typeof flexDirection !== 'undefined') {
    optionalProps.flexDirection = flexDirection;
  }

  if (typeof flexWrap !== 'undefined') {
    optionalProps.flexWrap = flexWrap;
  }

  if (typeof element !== 'undefined') {
    optionalProps.component = element;
  }

  if (typeof mb !== 'undefined') {
    optionalProps.mb = mb;
  }

  if (typeof ml !== 'undefined') {
    optionalProps.ml = ml;
  }

  if (typeof mr !== 'undefined') {
    optionalProps.mr = mr;
  }

  if (typeof mt !== 'undefined') {
    optionalProps.mt = mt;
  }

  if (typeof style !== 'undefined') {
    optionalProps.style = style;
  }

  return (
    <Box
      gap={gapState}
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
