import type { ButtonProps } from '@awsui/components-react/button';
import Button from '@awsui/components-react/button';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
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

  if (findDefined(href)) {
    optionalProps.href = href;
  }

  if (findDefined(iconAlt)) {
    optionalProps.iconAlt = iconAlt;
  }

  if (findDefined(iconName)) {
    optionalProps.iconName = iconName;
  }

  if (findDefined(target)) {
    optionalProps.target = target;
  }

  return (
    <Button iconAlign="right" variant={variant} {...optionalProps}>
      {children}
    </Button>
  );
}
