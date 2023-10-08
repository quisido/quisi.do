import type { ReactElement } from 'react';
import EmphasizeSubstring from '../../../../components/emphasize-substring';
import Link from '../../../../components/link';
import type Item from '../../types/packages-item';
import useNameCell from './name-cell.hook';

interface Props extends Pick<Item, 'href' | 'packageName'> {
  readonly filter: string;
}

export default function PackagesNameCell({
  filter,
  href,
  packageName,
}: Props): ReactElement {
  const { children, index } = useNameCell({
    filter,
    packageName,
  });

  return (
    <Link category="packages/name-cell" href={href} title={children}>
      <EmphasizeSubstring index={index} length={filter.length}>
        {children}
      </EmphasizeSubstring>
    </Link>
  );
}
