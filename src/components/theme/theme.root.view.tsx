import type { ComponentType, ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import DesignSystem from '../../constants/design-system';
import Design from '../design';
import type Props from './theme.type.props';

const AwsTheme: ComponentType<Props> = lazy(
  async () => import('./theme.aws.view'),
);

const MuiTheme: ComponentType<Props> = lazy(
  async () => import('./theme.mui.view'),
);

export default function Theme({ children }: Readonly<Props>): ReactElement {
  return (
    <Suspense fallback={<>{children}</>}>
      <Design
        props={{ children }}
        components={{
          [DesignSystem.Aws]: AwsTheme,
          [DesignSystem.Material]: MuiTheme,
        }}
      />
    </Suspense>
  );
}
