import findUndefined from '../../../utils/find-undefined';

const LARGE = 3;
const MEDIUM = 2;
const SMALL = 1;

export default function mapSizeToSystemValue(
  size: 'large' | 'medium' | 'small' | undefined,
): number | undefined {
  if (findUndefined(size)) {
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
