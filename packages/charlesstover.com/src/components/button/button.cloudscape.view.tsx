import type { ButtonProps } from '@cloudscape-design/components/button';
import Button from '@cloudscape-design/components/button';
import type { ReactElement } from 'react';
import findDefined from '../../utils/find-defined';
import useCloudscapeButton from './button.cloudscape.hook';
import type Props from './types/props';

export default function CloudscapeButton({
  children,
  href,
  variant,
}: Readonly<Props>): ReactElement {
  const { iconAlt, iconName, target } = useCloudscapeButton({ href });

  // Workaround until Cloudscape supports TypeScript 4.4 exact optional properties.
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
