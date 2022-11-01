import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsButton = lazy(async () => import('./button.aws.view'));
const CloudscapeButton = lazy(async () => import('./button.cloudscape.view'));
const MuiButton = lazy(async () => import('./button.mui.view'));

export default function Button(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsButton,
        [DesignSystem.Cloudscape]: CloudscapeButton,
        [DesignSystem.Material]: MuiButton,
      }}
      props={props}
    />
  );
}
