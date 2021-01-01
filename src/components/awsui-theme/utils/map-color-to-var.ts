import CSS_VAR from '../constants/css-var';

export default function mapColorToVar(color: string): string {
  const match: RegExpMatchArray | null = color.match(CSS_VAR);
  if (match === null) {
    return color;
  }
  return match[1];
}
