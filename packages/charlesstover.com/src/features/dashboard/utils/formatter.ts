import mapStringToInt from './map-string-to-int';

export default function formatter(score: string): [string, string] {
  return [`${mapStringToInt(score)}%`, 'Apdex score'];
}
