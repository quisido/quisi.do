import type { BoxProps } from '@awsui/components-react/box';

export default function mapSizeToAwsFontSize(
  size: 'large' | 'medium' | 'small',
): BoxProps.FontSize {
  switch (size) {
    case 'large':
      return 'display-l';
    case 'medium':
      return 'body-m';
    case 'small':
      return 'body-s';
  }
}
