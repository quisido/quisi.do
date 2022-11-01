import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsContainer = lazy(async () => import('./container.aws.view'));
const MuiContainer = lazy(async () => import('./container.mui.view'));
const CloudscapeContainer = lazy(
  async () => import('./container.cloudscape.view'),
);

export default function Container(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsContainer,
        [DesignSystem.Cloudscape]: CloudscapeContainer,
        [DesignSystem.Material]: MuiContainer,
      }}
      props={props}
    />
  );
}
