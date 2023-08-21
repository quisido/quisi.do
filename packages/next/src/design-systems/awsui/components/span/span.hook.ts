import type { BoxProps } from '@awsui/components-react/box';
import mapColorToAwsuiColor from './utils/map-color-to-awsui-color';
import mapSizeToFontSize from './utils/map-size-to-font-size';

interface Props {
  readonly color: 'inherit' | 'label' | 'secondary-body' | undefined;
  readonly element: 'h2' | 'p' | undefined;
  readonly size:
    | 'large'
    | 'medium-heading'
    | 'medium'
    | 'small-heading'
    | 'small'
    | undefined;
}

interface State {
  readonly color: BoxProps.Color | undefined;
  readonly fontSize: BoxProps.FontSize | undefined;
  readonly variant: 'h2' | 'p' | undefined;
}

export default function useAwsuiSpan({
  color,
  element,
  size,
}: Readonly<Props>): State {
  return {
    color: color && mapColorToAwsuiColor(color),
    fontSize: size && mapSizeToFontSize(size),
    variant: element,
  };
}
