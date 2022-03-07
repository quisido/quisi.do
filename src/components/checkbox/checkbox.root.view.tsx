import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsCheckbox = lazy(async () => import('./checkbox.aws.view'));
const MuiCheckbox = lazy(async () => import('./checkbox.mui.view'));
const React95Checkbox = lazy(async () => import('./checkbox.react95.view'));

export default function Checkbox(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsCheckbox,
        [DesignSystem.Material]: MuiCheckbox,
        [DesignSystem.React95]: React95Checkbox,
      }}
      props={props}
    />
  );
}
