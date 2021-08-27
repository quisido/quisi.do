import { Link } from '@awsui/components-react';
import type { ReactElement } from 'react';
import VERSION from '../../constants/version';

interface Props {
  readonly children?: string;
}

export default function FooterLink({ children }: Props): ReactElement {
  if (typeof children === 'undefined') {
    return <>v{VERSION}</>;
  }

  return (
    <Link external href={children} target="_blank">
      v{VERSION}
    </Link>
  );
}
