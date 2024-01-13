import Box, { type BoxProps } from '@mui/material/Box';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/div/index.js';
import useDiv from './div.hook.js';
import optional from '../../../../utils/optional.js';

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

  return (
    <Box
      {...optional<BoxProps>('className', className)}
      {...optional<BoxProps>('component', element)}
      {...optional<BoxProps>('display', display)}
      {...optional<BoxProps>('flexDirection', flexDirection)}
      {...optional<BoxProps>('flexWrap', flexWrap)}
      gap={gapState}
      justifyContent={justifyContent}
      margin={0}
      {...optional<BoxProps>('mb', mb)}
      {...optional<BoxProps>('ml', ml)}
      {...optional<BoxProps>('mr', mr)}
      {...optional<BoxProps>('mt', mt)}
      padding={0}
      {...optional<BoxProps>('style', style)}
      textAlign={textAlign}
    >
      {children}
    </Box>
  );
}
