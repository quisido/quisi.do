import type { ReactElement } from 'react';
import EmphasizeSubstring from '../../../../components/emphasize-substring';
import Link from '../../../../components/link';
import type Item from '../../types/packages-item';
import usePackagesNameCell from './packages-name-cell.hook';

interface Props extends Pick<Item, 'href' | 'packageName'> {
  readonly filter: string;
}

export default function PackagesNameCell({
  filter,
  href,
  packageName,
}: Props): ReactElement {
  const { index } = usePackagesNameCell({
    filter,
    packageName,
  });

  return (
    <Link href={href}>
      <EmphasizeSubstring index={index} length={filter.length}>
        {packageName}
      </EmphasizeSubstring>
    </Link>
  );
}
