import { type BoxProps } from '@cloudscape-design/components/box';

export default function mapSizeToCloudscapeSpacingSize(
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
