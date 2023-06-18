import type { ReactElement } from 'react';
import Link from '../../../../components/link';

interface Props {
  readonly children: string;
  readonly url: string | undefined;
}

export default function HomeProjectListItemName({
  children,
  url,
}: Readonly<Props>): ReactElement {
  if (typeof url !== 'string') {
    return <>{children}</>;
  }

  return (
    <Link
      category="features/home/project-list-item-name"
      href={url}
      title={children}
    >
      {children}
    </Link>
  );
}
