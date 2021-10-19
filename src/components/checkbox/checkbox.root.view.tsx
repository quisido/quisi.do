import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './checkbox.type.props';

const AwsCheckbox = lazy(async () => import('./checkbox.aws.view'));
const MuiCheckbox = lazy(async () => import('./checkbox.mui.view'));

export default function Checkbox(props: Readonly<Props>): ReactElement {
  return (
    <Design
      props={props}
      components={{
        [DesignSystem.Aws]: AwsCheckbox,
        [DesignSystem.Material]: MuiCheckbox,
      }}
    />
  );
}
