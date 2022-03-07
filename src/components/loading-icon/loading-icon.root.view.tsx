import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';

const AwsLoadingIcon = lazy(async () => import('./loading-icon.aws.view'));
const MuiLoadingIcon = lazy(async () => import('./loading-icon.mui.view'));
const React95LoadingIcon = lazy(
  async () => import('./loading-icon.react95.view'),
);

const PROPS: Record<string, never> = {};

export default function LoadingIcon(): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsLoadingIcon,
        [DesignSystem.Material]: MuiLoadingIcon,
        [DesignSystem.React95]: React95LoadingIcon,
      }}
      props={PROPS}
    />
  );
}
