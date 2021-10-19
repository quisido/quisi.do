import type { BoxProps } from '@awsui/components-react';
import { useMemo } from 'react';
import mapSizeToSpacingSize from './box.util.map-size-to-spacing-size';

interface Props {
  readonly element: 'h2' | 'p' | undefined;
  readonly fontSize: 'large' | 'medium' | 'small' | undefined;
  readonly margin: 'large' | 'medium' | 'small' | undefined;
  readonly marginBottom: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop: 'large' | 'medium' | 'small' | undefined;
  readonly marginX: 'large' | 'medium' | 'small' | undefined;
  readonly marginY: 'large' | 'medium' | 'small' | undefined;
}

interface State {
  readonly fontSize: BoxProps.FontSize | undefined;
  readonly margin: BoxProps.Spacing | undefined;
  readonly variant: 'h2' | 'p' | undefined;
}

export default function useAwsBox({
  element,
  fontSize,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
}: Readonly<Props>): State {
  const marginBottomSize: 'large' | 'medium' | 'small' | undefined =
    marginBottom ?? marginY ?? margin;
  const marginLeftSize: 'large' | 'medium' | 'small' | undefined =
    marginLeft ?? marginX ?? margin;
  const marginRightSize: 'large' | 'medium' | 'small' | undefined =
    marginRight ?? marginX ?? margin;
  const marginTopSize: 'large' | 'medium' | 'small' | undefined =
    marginTop ?? marginY ?? margin;

  return {
    variant: element,

    fontSize: useMemo((): BoxProps.FontSize | undefined => {
      if (typeof fontSize === 'undefined') {
        return;
      }
      switch (fontSize) {
        case 'large':
          return 'display-l';
        case 'medium':
          return 'body-m';
        case 'small':
          return 'body-s';
      }
    }, [fontSize]),

    margin: useMemo((): BoxProps.Spacing | undefined => {
      if (
        typeof marginBottomSize === 'undefined' &&
        typeof marginLeftSize === 'undefined' &&
        typeof marginRightSize === 'undefined' &&
        typeof marginTopSize === 'undefined'
      ) {
        return;
      }

      const newMargin: BoxProps.Spacing = {};
      if (typeof marginBottomSize !== 'undefined') {
        newMargin.bottom = mapSizeToSpacingSize(marginBottomSize);
      }
      if (typeof marginLeftSize !== 'undefined') {
        newMargin.left = mapSizeToSpacingSize(marginLeftSize);
      }
      if (typeof marginRightSize !== 'undefined') {
        newMargin.right = mapSizeToSpacingSize(marginRightSize);
      }
      if (typeof marginTopSize !== 'undefined') {
        newMargin.top = mapSizeToSpacingSize(marginTopSize);
      }

      return newMargin;
    }, [marginBottomSize, marginLeftSize, marginRightSize, marginTopSize]),
  };
}
