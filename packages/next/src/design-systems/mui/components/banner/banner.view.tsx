import type { AlertProps } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/banner';
import useBanner from './banner.hook';

export default function MuiBanner({
  children,
  onDismiss,
}: Props): ReactElement {
  const { closeText } = useBanner();

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
