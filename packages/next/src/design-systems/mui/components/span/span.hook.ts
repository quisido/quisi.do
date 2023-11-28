import mapColorToMuiColor from './utils/map-color-to-mui-color.js';
import mapSizeToFontSize from './utils/map-size-to-font-size.js';

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
