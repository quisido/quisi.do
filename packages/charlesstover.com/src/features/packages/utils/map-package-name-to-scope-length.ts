const FIRST = 0;
const NOT_FOUND = -1;
const SCOPE = /^@[\d\w\-]+\//;

export default function mapPackageNameToScopeLength(name: string): number {
  const match: RegExpExecArray | null = SCOPE.exec(name);

  if (match === null) {
    return NOT_FOUND;
  }

  return match[FIRST].length;
}
