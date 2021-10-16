import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './box.type.props';

const AwsBox: ComponentType<Props> = lazy(async () => import('./box.aws.view'));
const MuiBox: ComponentType<Props> = lazy(async () => import('./box.mui.view'));

export default function Box({
  children,
  ...props
}: Readonly<Props>): ReactElement {
  return (
    <Suspense fallback={<>{children}</>}>
      <Design
        props={{ children, ...props }}
        components={{
          [DesignSystem.Aws]: AwsBox,
          [DesignSystem.Material]: MuiBox,
        }}
      />
    </Suspense>
  );
}
