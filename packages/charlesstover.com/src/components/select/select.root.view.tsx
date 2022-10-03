import type { ReactElement } from 'react';
import { lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsSelect = lazy(async () => import('./select.aws.view'));
const MuiSelect = lazy(async () => import('./select.mui.view'));

export default function Select(props: Readonly<Props>): ReactElement {
  return (
    <Design
      components={{
        [DesignSystem.Aws]: AwsSelect,
        [DesignSystem.Material]: MuiSelect,
      }}
      props={props}
    />
  );
}
