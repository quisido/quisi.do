import type { BoxProps } from '@awsui/components-react/box';
import mapColorToAwsColor from './utils/map-color-to-aws-color';
import mapSizeToAwsFontSize from './utils/map-size-to-aws-font-size';

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

export default function useAwsSpan({
  color,
  element,
  size,
}: Readonly<Props>): State {
  return {
    color: color && mapColorToAwsColor(color),
    fontSize: size && mapSizeToAwsFontSize(size),
    variant: element,
  };
}
