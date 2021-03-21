import { ReactNode, useMemo } from 'react';
import emphasizeString from '../../utils/emphasize-string';

interface Props {
  filteringText: string;
  packageName: string;
  repositoryName: string;
}

interface State {
  children: ReactNode;
  href: string;
}

export default function usePackageName({
  filteringText,
  packageName,
  repositoryName,
}: Props): State {
  return {
    children: useMemo((): ReactNode => {
      if (filteringText === '') {
        return packageName;
      }
      const index: number = packageName.indexOf(filteringText);
      if (index === -1) {
        return packageName;
      }
      return emphasizeString(packageName, index, filteringText.length);
    }, [filteringText, packageName]),

    href: useMemo((): string => {
      switch (repositoryName) {
        case '@gamingmedley/konami.js':
          return 'https://github.com/CharlesStover/konami-js';
        default:
          return `https://github.com/CharlesStover/${repositoryName}`;
      }
    }, [repositoryName]),
  };
}
