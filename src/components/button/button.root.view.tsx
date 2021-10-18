import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './button.type.props';

const AwsButton: ComponentType<Props> = lazy(
  async () => import('./button.aws.view'),
);

const MuiButton: ComponentType<Props> = lazy(
  async () => import('./button.mui.view'),
);

export default function Button({
  children,
  ...props
}: Readonly<Props>): ReactElement {
  return (
    <Suspense fallback={<>{children}</>}>
      <Design
        props={{ children, ...props }}
        components={{
          [DesignSystem.Aws]: AwsButton,
          [DesignSystem.Material]: MuiButton,
        }}
      />
    </Suspense>
  );
}
