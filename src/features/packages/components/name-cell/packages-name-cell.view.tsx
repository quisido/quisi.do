import type { ReactElement } from 'react';
import EmphasizeSubstring from '../../../../components/emphasize-substring';
import Link from '../../../../components/link';
import type Item from '../../types/packages-item';
import usePackagesNameCell from './packages-name-cell.hook';

interface Props extends Item {
  readonly filteringText: string;
}

export default function PackagesNameCell({
  filteringText,
  packageName,
  repositoryName,
}: Props): ReactElement {
  const { href, index } = usePackagesNameCell({
    filteringText,
    packageName,
    repositoryName,
  });

  return (
    <Link href={href}>
      <EmphasizeSubstring index={index} length={filteringText.length}>
        {packageName}
      </EmphasizeSubstring>
    </Link>
  );
}