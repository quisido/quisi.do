import { type CSSProperties, useMemo } from 'react';
import mapSizeToSystemValue from './utils/map-size-to-system-value';

interface Props {
  readonly float?: 'left' | 'right' | undefined;
  readonly gap?: 'large' | 'medium' | 'small' | undefined;
  readonly margin?: 'large' | 'medium' | 'small' | undefined;
  readonly marginBottom?: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft?: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight?: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop?: 'large' | 'medium' | 'small' | undefined;
  readonly marginX?: 'large' | 'medium' | 'small' | undefined;
  readonly marginY?: 'large' | 'medium' | 'small' | undefined;
}

interface State {
  readonly gap: number | undefined;
  readonly mb: number | undefined;
  readonly ml: number | undefined;
  readonly mr: number | undefined;
  readonly mt: number | undefined;
  readonly style: CSSProperties | undefined;
}

export default function useMuiDiv({
  float,
  gap,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
}: Props): State {
  return {
    gap: mapSizeToSystemValue(gap),
    mb: mapSizeToSystemValue(marginBottom ?? marginY ?? margin),
    ml: mapSizeToSystemValue(marginLeft ?? marginX ?? margin),
    mr: mapSizeToSystemValue(marginRight ?? marginX ?? margin),
    mt: mapSizeToSystemValue(marginTop ?? marginY ?? margin),

    style: useMemo((): CSSProperties | undefined => {
      if (typeof float === 'undefined') {
        return;
      }

      return {
        float,
      };
    }, [float]),
  };
}
