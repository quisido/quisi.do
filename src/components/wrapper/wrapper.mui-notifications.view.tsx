import type { AlertProps } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import type { SnackbarOrigin } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import type { ReactElement } from 'react';
import type Notification from '../../types/notification';

interface Props {
  readonly children: readonly Notification[] | undefined;
}

const ANCHOR_ORIGIN: SnackbarOrigin = {
  horizontal: 'center',
  vertical: 'top',
};

const mapChildToSnackbar = (
  { CallToAction, message, onAction, onDismiss, type }: Readonly<Notification>,
  index: number,
): ReactElement => {
  const alertProps: AlertProps = {};
  if (typeof CallToAction === 'function' && typeof onAction === 'function') {
    alertProps.action = (
      <Button onClick={onAction}>
        <CallToAction />
      </Button>
    );
  }
  if (typeof onDismiss === 'function') {
    alertProps.onClose = onDismiss;
  }
  return (
    <Snackbar anchorOrigin={ANCHOR_ORIGIN} key={index} open>
      <Alert {...alertProps} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default function MuiWrapperNotifications({
  children,
}: Readonly<Props>): ReactElement | null {
  if (typeof children === 'undefined') {
    return null;
  }

  return <>{children.map(mapChildToSnackbar)}</>;
}
