import type { ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './display.type.props';

const AwsDisplay = lazy(async () => import('./display.aws.view'));
const MuiDisplay = lazy(async () => import('./display.mui.view'));

export default function Display({
  children,
  ...props
}: Readonly<Props>): ReactElement {
  return (
    <Suspense fallback={<>{children}</>}>
      <Design
        props={{ children, ...props }}
        components={{
          [DesignSystem.Aws]: AwsDisplay,
          [DesignSystem.Material]: MuiDisplay,
        }}
      />
    </Suspense>
  );
}
