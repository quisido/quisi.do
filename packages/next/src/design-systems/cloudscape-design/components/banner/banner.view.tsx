import type { AlertProps } from '@cloudscape-design/components/alert';
import Alert from '@cloudscape-design/components/alert';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/banner';
import validateString from '../../../../utils/validate-string';
import useBanner from './banner.hook';
import styles from './banner.module.scss';

const rootClassName: string = validateString(styles.root);

export default function CloudscapeDesignBanner({
  children,
  onDismiss,
}: Props): ReactElement {
  const { dismissAriaLabel } = useBanner();

  // Workaround until Cloudscape supports TypeScript 4.4 exact optional properties.
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
    <div className={rootClassName}>
      <Alert type="info" {...optionalAlertProps}>
        {children}
      </Alert>
    </div>
  );
}
