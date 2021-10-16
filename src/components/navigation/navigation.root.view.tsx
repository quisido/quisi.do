import type { ReactElement } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';
import type Props from './navigation.type.props';

const AwsNavigation = lazy(async () => import('./navigation.aws.view'));
const MuiNavigation = lazy(async () => import('./navigation.mui.view'));

export default function Navigation(props: Readonly<Props>): ReactElement {
  return (
    <Suspense fallback={null}>
      <Design
        props={props}
        components={{
          [DesignSystem.Aws]: AwsNavigation,
          [DesignSystem.Material]: MuiNavigation,
        }}
      />
    </Suspense>
  );
}
