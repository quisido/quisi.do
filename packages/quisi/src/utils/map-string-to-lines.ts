export default function mapStringToLines(str: string): readonly string[] {
  return str.split(/\r?\n/u);
}
