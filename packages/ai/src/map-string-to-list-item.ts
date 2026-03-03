export default function mapStringToListItem(
  str: string,
  index: number,
): string {
  return `${index + 1}. ${str}`;
}
