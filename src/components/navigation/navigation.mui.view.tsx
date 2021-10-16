import type { ComponentType, ReactElement } from 'react';
import useMuiNavigation from './navigation.mui.hook';
import type Props from './navigation.type.props';

export default function MuiNavigation({
  onClose,
  onOpen,
  open,
}: Readonly<Props>): ReactElement {
  const Component: ComponentType<Props> = useMuiNavigation();
  return <Component onClose={onClose} onOpen={onOpen} open={open} />;
}
