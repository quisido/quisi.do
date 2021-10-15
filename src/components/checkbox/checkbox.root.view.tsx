import type { ReactElement, ReactNode } from 'react';
import { Suspense, lazy } from 'react';
import Design from '../../components/design';
import DesignSystem from '../../constants/design-system';

interface Props {
  readonly checked: boolean;
  readonly children: ReactNode;
  readonly onChange: (checked: boolean) => void;
}

const AwsCheckbox = lazy(async () => import('./checkbox.aws.view'));
const MuiCheckbox = lazy(async () => import('./checkbox.mui.view'));

export default function Checkbox({
  checked,
  children,
  onChange,
}: Props): ReactElement {
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
