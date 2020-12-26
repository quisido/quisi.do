import { TextFilterProps } from '@awsui/components-react/text-filter';

export default function defaultCountText(
  count: number,
): TextFilterProps['countText'] {
  if (count === 0) {
    return 'No matches';
  }
  if (count === 1) {
    return '1 match';
  }
  return `${count} matches`;
}
