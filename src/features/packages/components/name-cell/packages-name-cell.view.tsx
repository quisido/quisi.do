import type { ReactElement } from 'react';
import EmphasizeSubstring from '../../../../components/emphasize-substring';
import Link from '../../../../components/link';
import type Item from '../../types/packages-item';
import usePackagesNameCell from './packages-name-cell.hook';

interface Props extends Item {
  readonly filter: string;
}

export default function PackagesNameCell({
  filter,
  packageName,
  repositoryName,
}: Props): ReactElement {
  const { href, index } = usePackagesNameCell({
    filter,
    packageName,
    repositoryName,
  });

  return (
    <Link href={href}>
      <EmphasizeSubstring index={index} length={filter.length}>
        {packageName}
      </EmphasizeSubstring>
    </Link>
  );
}
