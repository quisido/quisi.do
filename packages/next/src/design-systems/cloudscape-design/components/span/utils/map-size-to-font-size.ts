import { type BoxProps } from '@cloudscape-design/components/box';

export default function mapSizeToCloudscapeFontSize(
  size: 'large' | 'medium-heading' | 'medium' | 'small-heading' | 'small',
): BoxProps.FontSize {
  switch (size) {
    case 'large':
      return 'display-l';
    case 'medium':
      return 'body-m';
    case 'medium-heading':
      return 'heading-m';
    case 'small':
      return 'body-s';
    case 'small-heading':
      return 'heading-s';
  }
}
