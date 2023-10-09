import Box, { type BoxProps } from '@cloudscape-design/components/box';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/div';
import useDiv from './div.hook';

export default function CloudscapeDesignDiv({
  children,
  className: classNameProp,
  display: displayProp,
  element,
  flexDirection,
  flexWrap,
  float,
  gap,
  justifyContent,
  margin: marginProp,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  textAlign,
}: Props): ReactElement {
  const {
    className: classNameState,
    display: displayState,
    margin: marginState,
    style,
    variant,
  } = useDiv({
    className: classNameProp,
    display: displayProp,
    element,
    flexDirection,
    flexWrap,
    gap,
    justifyContent,
    margin: marginProp,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
  });

  const optionalProps: BoxProps = {};
  if (typeof displayState !== 'undefined') {
    optionalProps.display = displayState;
  }

  if (typeof float !== 'undefined') {
    optionalProps.float = float;
  }

  if (typeof marginState !== 'undefined') {
    optionalProps.margin = marginState;
  }

  if (typeof textAlign !== 'undefined') {
    optionalProps.textAlign = textAlign;
  }

  if (typeof variant !== 'undefined') {
    optionalProps.variant = variant;
  }

  if (typeof classNameState !== 'undefined' || typeof style !== 'undefined') {
    return (
      <Box {...optionalProps}>
        <div className={classNameState} style={style}>
          {children}
        </div>
      </Box>
    );
  }

  return <Box {...optionalProps}>{children}</Box>;
}
