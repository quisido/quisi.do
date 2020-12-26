import Link from '@awsui/components-react/link';
import { ReactElement } from 'react';
import Item from '../../types/item';
import usePackageName from './package-name.hook';

export default function PackageName({
  filteringText,
  packageName,
  repositoryName,
}: Item): ReactElement {
  const { children, href, ref } = usePackageName({
    filteringText,
    packageName,
    repositoryName,
  });

  return (
    <span ref={ref}>
      <Link
        // external
        href={href}
        target="_blank"
      >
        {children}
      </Link>
    </span>
  );
}
