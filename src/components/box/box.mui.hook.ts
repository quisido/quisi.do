import mapColorToMuiColor from './utils/map-color-to-mui-color';
import mapSizeToFontSize from './utils/map-size-to-mui-font-size';
import mapSizeToSystemValue from './utils/map-size-to-system-value';

interface Props {
  readonly color: 'label' | 'secondary-body' | undefined;
  readonly margin: 'large' | 'medium' | 'small' | undefined;
  readonly marginBottom: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop: 'large' | 'medium' | 'small' | undefined;
  readonly marginX: 'large' | 'medium' | 'small' | undefined;
  readonly marginY: 'large' | 'medium' | 'small' | undefined;
  readonly size: 'large' | 'medium' | 'small' | undefined;
}

interface State {
  readonly color: 'text.secondary' | undefined;
  readonly fontSize: number | undefined;
  readonly mb: number | undefined;
  readonly ml: number | undefined;
  readonly mr: number | undefined;
  readonly mt: number | undefined;
}

export default function useAwsBox({
  color,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
  size,
}: Readonly<Props>): State {
  return {
    color: color && mapColorToMuiColor(color),
    fontSize: size && mapSizeToFontSize(size),
    mb: mapSizeToSystemValue(marginBottom ?? marginY ?? margin),
    ml: mapSizeToSystemValue(marginLeft ?? marginX ?? margin),
    mr: mapSizeToSystemValue(marginRight ?? marginX ?? margin),
    mt: mapSizeToSystemValue(marginTop ?? marginY ?? margin),
  };
}
