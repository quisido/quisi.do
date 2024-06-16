const BASE = 36;
const PREFIX_LENGTH = '/'.length;

export default function mapPathnameToProjectId(pathname: string): number {
  const trimmed: string = pathname.substring(PREFIX_LENGTH);
  return parseInt(trimmed, BASE);
}
