import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsTheme = lazy(async () => import('./theme.aws.view'));
const MuiTheme = lazy(async () => import('./theme.mui.view'));
const React95Theme = lazy(async () => import('./theme.react95.view'));

export default function Theme({ children }: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsTheme,
        [DesignSystem.Material]: MuiTheme,
        [DesignSystem.React95]: React95Theme,
      }}
      props={{ children }}
    />
  );
}
