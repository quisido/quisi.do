import Alert, { type AlertProps } from '@mui/material/Alert';
import Snackbar, { type SnackbarOrigin } from '@mui/material/Snackbar';
import { type ReactElement } from 'react';
import Button from '../../components/button';
import type Notification from '../../types/notification';

interface Props {
  readonly children: readonly Notification[] | undefined;
}

const ANCHOR_ORIGIN: SnackbarOrigin = {
  horizontal: 'center',
  vertical: 'top',
};

const mapChildToSnackbar = (
  {
    CallToAction,
    Header,
    message,
    onAction,
    onDismiss,
    type,
  }: Readonly<Notification>,
  index: number,
): ReactElement => {
  const alertProps: AlertProps = {};

  if (typeof CallToAction === 'function' && typeof onAction === 'function') {
    alertProps.action = (
      <Button feature="notifications" onClick={onAction} variant="primary">
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
        {typeof Header !== 'undefined' && <Header />}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default function MuiWrapperNotifications({
  children,
}: Props): ReactElement | null {
  if (typeof children === 'undefined') {
    return null;
  }

  return <>{children.map(mapChildToSnackbar)}</>;
}
