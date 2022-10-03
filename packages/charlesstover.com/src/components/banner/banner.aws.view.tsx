import type { AlertProps } from '@awsui/components-react/alert';
import Alert from '@awsui/components-react/alert';
import type { ReactElement } from 'react';
import filterByDefined from '../../utils/filter-by-defined';
import useAwsBanner from './banner.aws.hook';
import type Props from './types/props';

export default function AwsBanner({
  children,
  onDismiss,
}: Readonly<Props>): ReactElement {
  const { dismissAriaLabel } = useAwsBanner();

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
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
