import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsWrapper: ComponentType<Props> = lazy(
  async () => import('./wrapper.aws.view'),
);
const MuiWrapper: ComponentType<Props> = lazy(
  async () => import('./wrapper.mui.view'),
);

export default function Wrapper({
  children,
  ...props
}: Readonly<Props>): ReactElement {
  return (
    // fallback={<>{children}</>}
    <Suspense fallback={null}>
      <Design
        props={{ children, ...props }}
        components={{
          [DesignSystem.Aws]: AwsWrapper,
          [DesignSystem.Material]: MuiWrapper,
        }}
      />
    </Suspense>
  );
}
