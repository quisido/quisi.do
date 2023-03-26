import type { ButtonProps } from '@awsui/components-react/button';
import Button from '@awsui/components-react/button';
import type { ReactElement } from 'react';
import isDefined from '../../utils/is-defined';
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

  if (isDefined(href)) {
    optionalProps.href = href;
  }

  if (isDefined(iconAlt)) {
    optionalProps.iconAlt = iconAlt;
  }

  if (isDefined(iconName)) {
    optionalProps.iconName = iconName;
  }

  if (isDefined(target)) {
    optionalProps.target = target;
  }

  return (
    <Button iconAlign="right" variant={variant} {...optionalProps}>
      {children}
    </Button>
  );
}
