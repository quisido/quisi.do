import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './color.type.props';

const AwsColor: ComponentType<Props> = lazy(
  async () => import('./color.aws.view'),
);
const MuiColor: ComponentType<Props> = lazy(
  async () => import('./color.mui.view'),
);

export default function Color({
  children,
  value,
}: Readonly<Props>): ReactElement {
  return (
    <Suspense fallback={<>{children}</>}>
      <Design
        props={{ children, value }}
        components={{
          [DesignSystem.Aws]: AwsColor,
          [DesignSystem.Material]: MuiColor,
        }}
      />
    </Suspense>
  );
}
