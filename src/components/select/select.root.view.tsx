import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './select.type.props';

const AwsSelect: ComponentType<Props> = lazy(
  async () => import('./select.aws.view'),
);

const MuiSelect: ComponentType<Props> = lazy(
  async () => import('./select.mui.view'),
);

export default function Select(props: Readonly<Props>): ReactElement {
  return (
    <Suspense fallback="...">
      <Design
        props={props}
        components={{
          [DesignSystem.Aws]: AwsSelect,
          [DesignSystem.Material]: MuiSelect,
        }}
      />
    </Suspense>
  );
}
