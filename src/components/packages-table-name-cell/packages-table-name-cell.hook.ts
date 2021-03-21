import { useMemo } from 'react';

interface Props {
  filteringText: string;
  packageName: string;
  repositoryName: string;
}

interface State {
  href: string;
  index: number;
}

export default function usePackagesTableNameCell({
  filteringText,
  packageName,
  repositoryName,
}: Props): State {
  return {
    href: `https://github.com/CharlesStover/${repositoryName}`,

    index: useMemo((): number => {
      if (filteringText === '') {
        return -1;
      }
      return packageName.indexOf(filteringText);
    }, [filteringText, packageName]),
  };
}
