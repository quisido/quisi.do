import mapSizeToSystemValue from './box.util.map-size-to-system-value';

interface Props {
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
  readonly fontSize: number | undefined;
  readonly mb: number | undefined;
  readonly ml: number | undefined;
  readonly mr: number | undefined;
  readonly mt: number | undefined;
}

const LARGE = 32;
const MEDIUM = 16;
const SMALL = 8;

const mapSizeToFontSize = (
  size: 'large' | 'medium' | 'small' | undefined,
): number | undefined => {
  if (typeof size === 'undefined') {
    return;
  }
  switch (size) {
    case 'large':
      return LARGE;
    case 'medium':
      return MEDIUM;
    case 'small':
      return SMALL;
  }
};

export default function useAwsBox({
  fontSize,
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
}: Readonly<Props>): State {
  return {
    fontSize: mapSizeToFontSize(fontSize),
    mb: mapSizeToSystemValue(marginBottom ?? marginY ?? margin),
    ml: mapSizeToSystemValue(marginLeft ?? marginX ?? margin),
    mr: mapSizeToSystemValue(marginRight ?? marginX ?? margin),
    mt: mapSizeToSystemValue(marginTop ?? marginY ?? margin),
  };
}
