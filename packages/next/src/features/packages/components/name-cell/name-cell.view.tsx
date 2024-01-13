import { type ReactElement } from 'react';
import EmphasizeSubstring from '../../../../components/emphasize-substring/index.js';
import Link from '../../../../components/link/index.js';
import type Item from '../../types/packages-item.js';
import useNameCell from './name-cell.hook.js';

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
    <Link feature="packages/name-cell" href={href} title={children}>
      <EmphasizeSubstring index={index} length={filter.length}>
        {children}
      </EmphasizeSubstring>
    </Link>
  );
}
