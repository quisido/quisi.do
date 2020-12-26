import { MutableRefObject, ReactNode, useMemo, useRef } from 'react';
import emphasizeString from '../../utils/emphasize-string';

interface Props {
  filteringText: string;
  packageName: string;
  repositoryName: string;
}

interface State {
  children: ReactNode;
  href: string;
  ref: MutableRefObject<HTMLSpanElement | null>;
}

export default function usePackageName({
  filteringText,
  packageName,
  repositoryName,
}: Props): State {
  const ref: MutableRefObject<HTMLSpanElement | null> = useRef<HTMLSpanElement>(
    null,
  );

  const children: ReactNode = useMemo((): ReactNode => {
    if (filteringText === '') {
      return packageName;
    }
    const index: number = packageName.indexOf(filteringText);
    if (index === -1) {
      return packageName;
    }
    return emphasizeString(packageName, index, filteringText.length);
  }, [filteringText, packageName]);

  return {
    children,
    href: `https://github.com/CharlesStover/${repositoryName}`,
    ref,
  };
}
