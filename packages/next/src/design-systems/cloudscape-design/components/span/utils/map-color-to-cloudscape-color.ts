import { type BoxProps } from '@cloudscape-design/components/box';

export default function mapColorToCloudscapeColor(
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
