import { useMemo } from 'react';

interface Props {
  readonly filter: string;
  readonly packageName: string;
}

interface State {
  readonly index: number;
}

const NOT_FOUND = -1;

export default function usePackagesNameCell({
  filter,
  packageName,
}: Props): State {
  return {
    index: useMemo((): number => {
      if (filter === '') {
        return NOT_FOUND;
      }
      return packageName.indexOf(filter);
    }, [filter, packageName]),
  };
}
