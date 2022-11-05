import type { AlertProps } from '@cloudscape-design/components/alert';
import Alert from '@cloudscape-design/components/alert';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import useCloudscapeBanner from './banner.cloudscape.hook';
import type Props from './types/props';

export default function CloudscapeBanner({
  children,
  onDismiss,
}: Readonly<Props>): ReactElement {
  const { dismissAriaLabel } = useCloudscapeBanner();

  // Workaround until Cloudscape supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalAlertProps: Pick<
    AlertProps,
    'dismissAriaLabel' | 'dismissible' | 'onDismiss'
  > = {};

  if (filterByDefined(dismissAriaLabel)) {
    optionalAlertProps.dismissAriaLabel = dismissAriaLabel;
  }

  if (typeof onDismiss === 'function') {
    optionalAlertProps.dismissible = true;
    optionalAlertProps.onDismiss = onDismiss;
  } else {
    optionalAlertProps.dismissible = false;
  }

  return (
    <Alert type="info" visible {...optionalAlertProps}>
      {children}
    </Alert>
  );
}