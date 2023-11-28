export default function mapParentSelectorToLabelSelector(
  selector: string | undefined,
): string {
  if (typeof selector === 'undefined') {
    return 'label';
  }

  return `${selector} label`;
}
