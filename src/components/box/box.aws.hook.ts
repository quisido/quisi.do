import type { BoxProps } from '@awsui/components-react';
import { useMemo } from 'react';
import mapSizeToSpacingSize from './box.util.map-size-to-spacing-size';

interface Props {
  readonly marginBottom: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop: 'large' | 'medium' | 'small' | undefined;
}

interface State {
  readonly margin: BoxProps.Spacing | undefined;
}

export default function useAwsBox({
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
}: Readonly<Props>): State {
  return {
    margin: useMemo((): BoxProps.Spacing | undefined => {
      if (
        typeof marginBottom === 'undefined' &&
        typeof marginLeft === 'undefined' &&
        typeof marginRight === 'undefined' &&
        typeof marginTop === 'undefined'
      ) {
        return;
      }

      const newMargin: BoxProps.Spacing = {};
      if (typeof marginBottom !== 'undefined') {
        newMargin.bottom = mapSizeToSpacingSize(marginBottom);
      }
      if (typeof marginLeft !== 'undefined') {
        newMargin.left = mapSizeToSpacingSize(marginLeft);
      }
      if (typeof marginRight !== 'undefined') {
        newMargin.right = mapSizeToSpacingSize(marginRight);
      }
      if (typeof marginTop !== 'undefined') {
        newMargin.top = mapSizeToSpacingSize(marginTop);
      }

      return newMargin;
    }, [marginBottom, marginLeft, marginRight, marginTop]),
  };
}
