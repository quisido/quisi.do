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
  className,
  href,
  title,
}: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsLink,
        [DesignSystem.Material]: MuiLink,
      }}
      fallback={
        <ReactRouterLink className={className} title={title} to={href}>
          {children}
        </ReactRouterLink>
      }
      props={{ children, className, href, title }}
    />
  );
}
