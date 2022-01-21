import type { ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './types/props';

const AwsContainer = lazy(async () => import('./container.aws.view'));
const MuiContainer = lazy(async () => import('./container.mui.view'));

export default function Container({
  children,
  ...props
}: Readonly<Props>): ReactElement {
  return (
    <Suspense fallback={<>{children}</>}>
      <Design
        components={{
          [DesignSystem.Aws]: AwsContainer,
          [DesignSystem.Material]: MuiContainer,
        }}
        props={{ children, ...props }}
      />
    </Suspense>
  );
}
