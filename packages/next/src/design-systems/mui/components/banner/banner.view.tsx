import Alert from '@mui/material/Alert';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/banner.js';
import useBanner from './banner.hook.js';
import optional from '../../../../utils/optional.js';

export default function MuiBanner({
  children,
  onDismiss,
}: Props): ReactElement {
  const { closeText } = useBanner();

  return (
    <Alert
      {...optional('closeText', closeText)}
      color="info"
      {...optional('onClose', onDismiss)}
      severity="info"
    >
      {children}
    </Alert>
  );
}
