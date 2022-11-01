import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';

const AwsLoadingIcon = lazy(async () => import('./loading-icon.aws.view'));
const MuiLoadingIcon = lazy(async () => import('./loading-icon.mui.view'));
const CloudscapeLoadingIcon = lazy(
  async () => import('./loading-icon.cloudscape.view'),
);

const PROPS: Readonly<Record<string, never>> = Object.freeze({});

export default function LoadingIcon(): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsLoadingIcon,
        [DesignSystem.Cloudscape]: CloudscapeLoadingIcon,
        [DesignSystem.Material]: MuiLoadingIcon,
      }}
      props={PROPS}
    />
  );
}
