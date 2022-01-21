import type { BoxProps } from '@awsui/components-react';
import mapColorToAwsColor from './utils/map-color-to-aws-color';
import mapSizeToAwsFontSize from './utils/map-size-to-aws-font-size';

interface Props {
  readonly color: 'label' | 'secondary-body' | undefined;
  readonly element: 'h2' | 'p' | undefined;
  readonly size: 'large' | 'medium' | 'small' | undefined;
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
