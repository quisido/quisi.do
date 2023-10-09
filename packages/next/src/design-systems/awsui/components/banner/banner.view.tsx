import Alert, { type AlertProps } from '@awsui/components-react/alert';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/banner';
import useBanner from './banner.hook';

export default function AwsuiBanner({
  children,
  onDismiss,
}: Props): ReactElement {
  const { dismissAriaLabel } = useBanner();

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalAlertProps: Pick<
    AlertProps,
    'dismissAriaLabel' | 'dismissible' | 'onDismiss'
  > = {};

  if (typeof dismissAriaLabel !== 'undefined') {
    optionalAlertProps.dismissAriaLabel = dismissAriaLabel;
  }

  if (typeof onDismiss === 'function') {
    optionalAlertProps.dismissible = true;
    optionalAlertProps.onDismiss = onDismiss;
  } else {
    optionalAlertProps.dismissible = false;
  }

  return (
    <Alert type="info" {...optionalAlertProps}>
      {children}
    </Alert>
  );
}
