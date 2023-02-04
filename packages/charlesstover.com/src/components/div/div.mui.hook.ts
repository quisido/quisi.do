import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import findUndefined from '../../utils/find-undefined';
import mapSizeToSystemValue from './utils/map-size-to-system-value';

interface Props {
  readonly float: 'left' | 'right' | undefined;
  readonly margin: 'large' | 'medium' | 'small' | undefined;
  readonly marginBottom: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop: 'large' | 'medium' | 'small' | undefined;
  readonly marginX: 'large' | 'medium' | 'small' | undefined;
  readonly marginY: 'large' | 'medium' | 'small' | undefined;
}

interface State {
  readonly mb: number | undefined;
  readonly ml: number | undefined;
  readonly mr: number | undefined;
  readonly mt: number | undefined;
  readonly style: CSSProperties | undefined;
}

export default function useAwsDiv({
  float,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
}: Readonly<Props>): State {
  return {
    mb: mapSizeToSystemValue(marginBottom ?? marginY ?? margin),
    ml: mapSizeToSystemValue(marginLeft ?? marginX ?? margin),
    mr: mapSizeToSystemValue(marginRight ?? marginX ?? margin),
    mt: mapSizeToSystemValue(marginTop ?? marginY ?? margin),

    style: useMemo((): CSSProperties | undefined => {
      if (findUndefined(float)) {
        return;
      }

      return {
        float,
      };
    }, [float]),
  };
}
