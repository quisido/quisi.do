import type { BoxProps } from '@awsui/components-react';

export default function mapSizeToSpacingSize(
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
