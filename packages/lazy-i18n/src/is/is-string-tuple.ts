export default function isStringTuple(
  tuple: [unknown, unknown],
): tuple is [string, string] {
  const [one, two] = tuple;
  return typeof one === 'string' && typeof two === 'string';
}
