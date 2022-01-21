import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsDiv = lazy(async () => import('./div.aws.view'));
const MuiDiv = lazy(async () => import('./div.mui.view'));

export default function Div(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsDiv,
        [DesignSystem.Material]: MuiDiv,
      }}
      props={props}
    />
  );
}
