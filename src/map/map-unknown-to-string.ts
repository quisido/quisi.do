export default function mapUnknownToString(unknown: unknown): null | string {
  if (typeof unknown === 'undefined' || unknown === null) {
    return null;
  }
  if (typeof unknown === 'number') {
    return unknown.toString();
  }
  if (typeof unknown === 'string') {
    return unknown;
  }
  if (unknown instanceof Error) {
    return unknown.message;
  }
  return JSON.stringify(unknown);
}
