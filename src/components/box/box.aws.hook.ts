import type { BoxProps } from '@awsui/components-react';
import { useMemo } from 'react';
import mapSizeToSpacingSize from './box.util.map-size-to-spacing-size';

interface Props {
  readonly marginTop: 'large' | 'medium' | 'small';
}

interface State {
  readonly margin: BoxProps.Spacing;
}

export default function useAwsBox({ marginTop }: Readonly<Props>): State {
  return {
    margin: useMemo(
      (): BoxProps.Spacing => ({
        top: mapSizeToSpacingSize(marginTop),
      }),
      [marginTop],
    ),
  };
}
