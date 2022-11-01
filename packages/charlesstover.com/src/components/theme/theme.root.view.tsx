import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsTheme = lazy(async () => import('./theme.aws.view'));
const CloudscapeTheme = lazy(async () => import('./theme.cloudscape.view'));
const MuiTheme = lazy(async () => import('./theme.mui.view'));

export default function Theme({ children }: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsTheme,
        [DesignSystem.Cloudscape]: CloudscapeTheme,
        [DesignSystem.Material]: MuiTheme,
      }}
      props={{ children }}
    />
  );
}
