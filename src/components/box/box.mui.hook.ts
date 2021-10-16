import mapSizeToSystemValue from './box.util.map-size-to-system-value';

interface Props {
  readonly marginBottom: 'large' | 'medium' | 'small' | undefined;
  readonly marginLeft: 'large' | 'medium' | 'small' | undefined;
  readonly marginRight: 'large' | 'medium' | 'small' | undefined;
  readonly marginTop: 'large' | 'medium' | 'small' | undefined;
}

interface State {
  readonly mb: number | undefined;
  readonly ml: number | undefined;
  readonly mr: number | undefined;
  readonly mt: number | undefined;
}

export default function useAwsBox({
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
}: Readonly<Props>): State {
  return {
    mb: mapSizeToSystemValue(marginBottom),
    ml: mapSizeToSystemValue(marginLeft),
    mr: mapSizeToSystemValue(marginRight),
    mt: mapSizeToSystemValue(marginTop),
  };
}
