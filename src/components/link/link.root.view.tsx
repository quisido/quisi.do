import type { ReactElement, ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import DesignSystem from '../../constants/design-system';
import Design from '../design';

interface Props {
  readonly children: ReactNode;
  readonly path: string;
}

const AwsLink = lazy(async () => import('./link.aws.view'));
const MuiLink = lazy(async () => import('./link.mui.view'));

export default function Link({ children, path }: Props): ReactElement {
  return (
    <Suspense
      fallback={<ReactRouterLink to={path}>{children}</ReactRouterLink>}
    >
      <Design
        props={{ children, path }}
        components={{
          [DesignSystem.Aws]: AwsLink,
          [DesignSystem.Material]: MuiLink,
        }}
      />
    </Suspense>
  );
}
