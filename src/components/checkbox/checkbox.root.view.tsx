import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './checkbox.type.props';

const AwsCheckbox: ComponentType<Props> = lazy(
  async () => import('./checkbox.aws.view'),
);

const MuiCheckbox: ComponentType<Props> = lazy(
  async () => import('./checkbox.mui.view'),
);

export default function Checkbox({
  checked,
  children,
  onChange,
}: Readonly<Props>): ReactElement {
  return (
    <Suspense fallback={<>{children}</>}>
      <Design
        props={{ checked, children, onChange }}
        components={{
          [DesignSystem.Aws]: AwsCheckbox,
          [DesignSystem.Material]: MuiCheckbox,
        }}
      />
    </Suspense>
  );
}
