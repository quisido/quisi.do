import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import DesignSystem from '../../constants/design-system';
import Design from '../design';
import type Props from './link.type.props';

const AwsLink: ComponentType<Props> = lazy(
  async () => import('./link.aws.view'),
);

const MuiLink: ComponentType<Props> = lazy(
  async () => import('./link.mui.view'),
);

export default function Link({
  children,
  path,
}: Readonly<Props>): ReactElement {
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
