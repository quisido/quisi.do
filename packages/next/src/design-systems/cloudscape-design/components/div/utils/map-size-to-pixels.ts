const LARGE = 24;
const MEDIUM = 16;
const SMALL = 8;

export default function mapSizeToPixels(
  size: 'large' | 'medium' | 'small',
): number {
  switch (size) {
    case 'large':
      return LARGE;
    case 'medium':
      return MEDIUM;
    case 'small':
      return SMALL;
  }
}
