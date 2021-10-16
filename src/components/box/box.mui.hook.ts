import mapSizeToSystemValue from './box.util.map-size-to-system-value';

interface Props {
  readonly marginTop: 'large' | 'medium' | 'small';
}

interface State {
  readonly mt: number | undefined;
}

export default function useAwsBox({ marginTop }: Readonly<Props>): State {
  return {
    mt: mapSizeToSystemValue(marginTop),
  };
}
