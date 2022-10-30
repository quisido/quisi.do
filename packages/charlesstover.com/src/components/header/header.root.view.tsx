import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import Fallback from './components/fallback';
import type Props from './types/props';

const AwsHeader = lazy(async () => import('./header.aws.view'));
const MuiHeader = lazy(async () => import('./header.mui.view'));

export default function Header(props: Readonly<Props>): ReactElement {
  return (
    <Design
      Fallback={Fallback}
      components={{
        [DesignSystem.Aws]: AwsHeader,
        [DesignSystem.Material]: MuiHeader,
      }}
      props={props}
    />
  );
}
