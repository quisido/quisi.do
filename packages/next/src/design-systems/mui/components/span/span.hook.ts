import mapColorToMuiColor from './utils/map-color-to-mui-color';
import mapSizeToFontSize from './utils/map-size-to-font-size';

interface Props {
  readonly color: 'inherit' | 'label' | 'secondary-body' | undefined;
  readonly size:
    | 'large'
    | 'medium-heading'
    | 'medium'
    | 'small-heading'
    | 'small'
    | undefined;
}

interface State {
  readonly color: 'inherit' | 'text.secondary' | undefined;
  readonly fontSize: number | undefined;
}

export default function useMuiSpan({ color, size }: Props): State {
  return {
    color: color && mapColorToMuiColor(color),
    fontSize: size && mapSizeToFontSize(size),
  };
}
