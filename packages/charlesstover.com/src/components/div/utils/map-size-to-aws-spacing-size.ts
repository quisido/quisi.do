import type { BoxProps } from '@awsui/components-react/box';

export default function mapSizeToAwsSpacingSize(
  size: 'large' | 'medium' | 'small',
): BoxProps.SpacingSize {
  switch (size) {
    case 'large':
      return 'l';
    case 'medium':
      return 'm';
    case 'small':
      return 's';
  }
}
