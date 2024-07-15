export default function mapChildrenToTranslationKeys(
  children: number | string | (number | string)[],
): string {
  if (Array.isArray(children)) {
    return children.join('');
  }
  return children.toString();
}
