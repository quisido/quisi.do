import type { ButtonProps } from '@awsui/components-react/button';
import Button from '@awsui/components-react/button';
import type { ReactElement } from 'react';
import useAwsButton from './button.aws.hook';
import type Props from './types/props';

export default function AwsButton({
  children,
  href,
  variant,
}: Readonly<Props>): ReactElement {
  const { iconAlt, iconName, target } = useAwsButton({ href });

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalProps: Pick<
    ButtonProps,
    'href' | 'iconAlt' | 'iconName' | 'target'
  > = {};
  if (typeof href !== 'undefined') {
    optionalProps.href = href;
  }
  if (typeof iconAlt !== 'undefined') {
    optionalProps.iconAlt = iconAlt;
  }
  if (typeof iconName !== 'undefined') {
    optionalProps.iconName = iconName;
  }
  if (typeof target !== 'undefined') {
    optionalProps.target = target;
  }

  return (
    <Button iconAlign="right" variant={variant} {...optionalProps}>
      {children}
    </Button>
  );
}
