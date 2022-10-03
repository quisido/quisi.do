import type { AlertProps } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import type { ReactElement } from 'react';
import type Props from './types/props';
import useMuiBanner from './banner.mui.hook';

export default function MuiBanner({
  children,
  onDismiss,
}: Readonly<Props>): ReactElement {
  const { closeText } = useMuiBanner();

  const optionalProps: Pick<AlertProps, 'closeText' | 'onClose'> = {};
  if (typeof closeText === 'string') {
    optionalProps.closeText = closeText;
  }
  if (typeof onDismiss === 'function') {
    optionalProps.onClose = onDismiss;
  }

  return (
    <Alert color="info" severity="info" {...optionalProps}>
      {children}
    </Alert>
  );
}
