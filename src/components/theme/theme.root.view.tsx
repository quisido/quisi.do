import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsTheme = lazy(async () => import('./theme.aws.view'));
const MuiTheme = lazy(async () => import('./theme.mui.view'));

export default function Theme({ children }: Readonly<Props>): ReactElement {
  return (
    <Design
      props={{ children }}
      components={{
        [DesignSystem.Aws]: AwsTheme,
        [DesignSystem.Material]: MuiTheme,
      }}
    />
  );
}
