import type { BoxProps } from '@awsui/components-react/box';

export default function mapColorToAwsColor(color: 'label'): BoxProps.Color {
  switch (color) {
    case 'label':
      return 'text-label';
  }
}
