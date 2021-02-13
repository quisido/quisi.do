import Link from '@awsui/components-react/link';
import { ReactElement } from 'react';
import Item from '../../types/item';
import usePackageName from './package-name.hook';

interface Props extends Item {
  filteringText: string;
}

export default function PackageName({
  filteringText,
  packageName,
  repositoryName,
}: Props): ReactElement {
  const { children, href } = usePackageName({
    filteringText,
    packageName,
    repositoryName,
  });

  return (
    <Link href={href} target="_blank">
      {children}
    </Link>
  );
}
