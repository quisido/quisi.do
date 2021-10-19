import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './color.type.props';

const AwsColor = lazy(async () => import('./color.aws.view'));
const MuiColor = lazy(async () => import('./color.mui.view'));

export default function Color(props: Readonly<Props>): ReactElement {
  return (
    <Design
      props={props}
      components={{
        [DesignSystem.Aws]: AwsColor,
        [DesignSystem.Material]: MuiColor,
      }}
    />
  );
}
