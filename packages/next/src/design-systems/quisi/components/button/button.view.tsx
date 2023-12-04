import Button, { type ButtonProps } from '@mui/material/Button';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/button';
import useButton from './button.hook';

export default function MuiButton({
  category,
  children,
  href,
  onClick,
  variant: variantProp,
}: Props): ReactElement {
  const { handleClick, variant: variantState } = useButton({
    category,
    children,
    href,
    onClick,
    variant: variantProp,
  });

  const optionalProps: Pick<ButtonProps, 'href'> = {};
  if (typeof href === 'string') {
    optionalProps.href = href;
  }

  return (
    <Button onClick={handleClick} variant={variantState} {...optionalProps}>
      {children}
    </Button>
  );
}
