import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsChip = lazy(async () => import('./chip.aws.view'));
const MuiChip = lazy(async () => import('./chip.mui.view'));
const React95Chip = lazy(async () => import('./chip.react95.view'));

export default function Chip(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsChip,
        [DesignSystem.Material]: MuiChip,
        [DesignSystem.React95]: React95Chip,
      }}
      props={props}
    />
  );
}
