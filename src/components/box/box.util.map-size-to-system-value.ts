const LARGE = 2.5;
const MEDIUM = 1.75;
const SMALL = 1;

export default function mapSizeToSystemValue(
  size: 'large' | 'medium' | 'small' | undefined,
): number | undefined {
  if (typeof size === 'undefined') {
    return;
  }

  switch (size) {
    case 'large':
      return LARGE;
    case 'medium':
      return MEDIUM;
    case 'small':
      return SMALL;
  }
}
