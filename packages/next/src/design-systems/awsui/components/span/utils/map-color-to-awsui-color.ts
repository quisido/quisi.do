import type { BoxProps } from '@awsui/components-react/box';

export default function mapColorToAwsuiColor(
  color: 'inherit' | 'label' | 'secondary-body',
): BoxProps.Color {
  switch (color) {
    case 'inherit':
      return 'inherit';
    case 'label':
      return 'text-label';
    case 'secondary-body':
      return 'text-body-secondary';
  }
}
