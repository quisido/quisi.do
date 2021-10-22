import type { ReactElement } from 'react';
import { lazy } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsLink = lazy(async () => import('./link.aws.view'));
const MuiLink = lazy(async () => import('./link.mui.view'));

export default function Link({
  children,
  href,
}: Readonly<Props>): ReactElement {
  return (
    <Design
      fallback={<ReactRouterLink to={href}>{children}</ReactRouterLink>}
      props={{ children, href }}
      components={{
        [DesignSystem.Aws]: AwsLink,
        [DesignSystem.Material]: MuiLink,
      }}
    />
  );
}
