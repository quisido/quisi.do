import { useMemo } from 'react';

interface Props {
  readonly filter: string;
  readonly packageName: string;
  readonly repositoryName: string;
}

interface State {
  readonly href: string;
  readonly index: number;
}

const NOT_FOUND = -1;

export default function usePackagesNameCell({
  filter,
  packageName,
  repositoryName,
}: Props): State {
  return {
    href: `https://github.com/CharlesStover/${repositoryName}`,

    index: useMemo((): number => {
      if (filter === '') {
        return NOT_FOUND;
      }
      return packageName.indexOf(filter);
    }, [filter, packageName]),
  };
}
