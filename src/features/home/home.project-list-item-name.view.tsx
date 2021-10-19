import type { ReactElement } from 'react';
import Link from '../../components/link';

interface Props {
  readonly children: string;
  readonly url: string | undefined;
}

export default function HomeProjectListItemName({
  children,
  url,
}: Props): ReactElement {
  if (typeof url !== 'string') {
    return <>{children}</>;
  }

  return <Link href={url}>{children}</Link>;
}
