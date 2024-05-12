import mapStringToInt from './map-string-to-int.js';

export default function formatApdexScore(score: string): [string, string] {
  return [`${mapStringToInt(score).toString()}%`, 'Apdex score'];
}
