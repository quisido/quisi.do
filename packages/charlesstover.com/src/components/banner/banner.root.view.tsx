import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsBanner = lazy(async () => import('./banner.aws.view'));
const MuiBanner = lazy(async () => import('./banner.mui.view'));

export default function Banner(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsBanner,
        [DesignSystem.Material]: MuiBanner,
      }}
      props={props}
    />
  );
}
