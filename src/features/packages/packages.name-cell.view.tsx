import Link from '@awsui/components-react/link';
import type { ReactElement } from 'react';
import EmphasizeSubstring from '../../components/emphasize-substring';
import usePackagesNameCell from './packages.name-cell.hook';
import type Item from './packages.type.item';

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
    <Link href={href} target="_blank">
      <EmphasizeSubstring index={index} length={filteringText.length}>
        {packageName}
      </EmphasizeSubstring>
    </Link>
  );
}
