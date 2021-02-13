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
    href: `https://github.com/CharlesStover/${repositoryName}`,

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
  };
}
