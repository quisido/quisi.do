import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import Fallback from './components/fallback';
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
      Fallback={Fallback}
      components={{
        [DesignSystem.Aws]: AwsLink,
        [DesignSystem.Material]: MuiLink,
      }}
      props={{ children, className, href, title }}
    />
  );
}
