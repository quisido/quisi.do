import type { ButtonProps } from '@awsui/components-react/button';
import Button from '@awsui/components-react/button';
import type { ReactElement } from 'react';
import type { Props } from '../../../../components/button';
import useButton from './button.hook';

export default function AwsuiButton({
  children,
  href,
  variant,
}: Readonly<Props>): ReactElement {
  const { iconAlt, iconName, target } = useButton({ href });

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
