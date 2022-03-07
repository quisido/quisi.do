import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsContainer = lazy(async () => import('./container.aws.view'));
const MuiContainer = lazy(async () => import('./container.mui.view'));
const React95Container = lazy(async () => import('./container.react95.view'));

export default function Container(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsContainer,
        [DesignSystem.Material]: MuiContainer,
        [DesignSystem.React95]: React95Container,
      }}
      props={props}
    />
  );
}
