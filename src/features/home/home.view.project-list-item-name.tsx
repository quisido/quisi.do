import Link from '@awsui/components-react/link';
import type { ReactElement } from 'react';

interface Props {
  readonly children: string;
  readonly url: string | undefined;
}

export default function HomeProjectListItemName({
  children,
  url,
}: Props): ReactElement {
  if (typeof url === 'string') {
    return (
      <Link external fontSize="heading-l" href={url} target="_blank">
        {children}
      </Link>
    );
  }

  return <>{children}</>;
}
