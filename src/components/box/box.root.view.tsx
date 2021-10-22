import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsBox = lazy(async () => import('./box.aws.view'));
const MuiBox = lazy(async () => import('./box.mui.view'));

export default function Box({
  children,
  ...props
}: Readonly<Props>): ReactElement {
  return (
    <Design
      props={{ children, ...props }}
      components={{
        [DesignSystem.Aws]: AwsBox,
        [DesignSystem.Material]: MuiBox,
      }}
    />
  );
}
