import Button from '@mui/material/Button';
import { type ReactElement } from 'react';
import { type Props } from '../../../../components/button.js';
import useButton from './button.hook.js';
import optional from '../../../../utils/optional.js';

export default function MuiButton({
  children,
  feature,
  href,
  onClick,
  variant: variantProp,
}: Props): ReactElement {
  const { handleClick, variant: variantState } = useButton({
    children,
    feature,
    href,
    onClick,
    variant: variantProp,
  });

  return (
    <Button
      {...optional('href', href)}
      onClick={handleClick}
      variant={variantState}
    >
      {children}
    </Button>
  );
}
