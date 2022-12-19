interface Props {
  readonly filter: string;
  readonly packageName: string;
}

interface State {
  readonly children: string;
  readonly index: number;
}

const NOT_FOUND = -1;
const SCOPES: readonly string[] = ['monorepo-template'];

const mapPackageNameToScopeLength = (name: string): number => {
  for (const scope of SCOPES) {
    if (name.startsWith(`@${scope}/`)) {
      return scope.length + 2;
    }
  }
  return NOT_FOUND;
};

export default function usePackagesNameCell({
  filter,
  packageName,
}: Props): State {
  const scopeLength: number = mapPackageNameToScopeLength(packageName);

  const getIndex = (): number => {
    if (filter === '') {
      return NOT_FOUND;
    }

    const index: number = packageName.indexOf(filter);
    if (scopeLength === NOT_FOUND) {
      return index;
    }

    return index - scopeLength;
  };

  return {
    index: getIndex(),
    children:
      scopeLength === NOT_FOUND
        ? packageName
        : packageName.substring(scopeLength),
  };
}
