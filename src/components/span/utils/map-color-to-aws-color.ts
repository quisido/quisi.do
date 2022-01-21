import type { BoxProps } from '@awsui/components-react/box';

export default function mapColorToAwsColor(
  color: 'label' | 'secondary-body',
): BoxProps.Color {
  switch (color) {
    case 'label':
      return 'text-label';
    case 'secondary-body':
      return 'text-body-secondary';
  }
}
