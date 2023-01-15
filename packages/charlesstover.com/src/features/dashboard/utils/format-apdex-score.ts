import mapStringToInt from './map-string-to-int';

export default function formatApdexScore(score: string): [string, string] {
  return [`${mapStringToInt(score)}%`, 'Apdex score'];
}
