import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsBox = lazy(async () => import('./span.aws.view'));
const MuiBox = lazy(async () => import('./span.mui.view'));

export default function Box(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsBox,
        [DesignSystem.Material]: MuiBox,
      }}
      props={props}
    />
  );
}
