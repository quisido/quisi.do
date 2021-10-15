import type { ReactElement, ReactNode } from 'react';
import DesignSystem from '../../constants/design-system';
import useTheme from './theme.root.hook';

interface Props {
  readonly children: ReactNode;
}

export default function Theme({ children }: Props): ReactElement {
  const { designSystem } = useTheme();

  switch (designSystem) {
    case DesignSystem.Aws:
      return <>{children}</>;

    case DesignSystem.Material:
      return <>Coming soon...</>;
  }
}
