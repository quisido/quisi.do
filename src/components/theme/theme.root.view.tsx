import type { ReactElement, ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import DesignSystem from '../../constants/design-system';
import Design from '../design';

interface Props {
  readonly children: ReactNode;
}

const AwsTheme = lazy(async () => import('./theme.aws.view'));
const MuiTheme = lazy(async () => import('./theme.mui.view'));

export default function Theme({ children }: Props): ReactElement {
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
