const LARGE = 32;
const MEDIUM = 16;
const SMALL = 12;

export default function mapSizeToMuiFontSize(
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
