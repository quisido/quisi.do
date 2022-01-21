import mapColorToMuiColor from './utils/map-color-to-mui-color';
import mapSizeToFontSize from './utils/map-size-to-mui-font-size';

interface Props {
  readonly color: 'label' | 'secondary-body' | undefined;
  readonly size: 'large' | 'medium' | 'small' | undefined;
}

interface State {
  readonly color: 'text.secondary' | undefined;
  readonly fontSize: number | undefined;
}

export default function useMuiSpan({ color, size }: Readonly<Props>): State {
  return {
    color: color && mapColorToMuiColor(color),
    fontSize: size && mapSizeToFontSize(size),
  };
}
