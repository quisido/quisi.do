import Divider from '@mui/material/Divider';
import { type ReactElement } from 'react';
import Item from '../../components/navigation-item';
import type Props from '../../types/navigation-root-item-props';

export default function WrapperMuiNavigationRootItem({
  divider,
  item,
}: Props): ReactElement {
  return (
    <>
      <Item>{item}</Item>
      {divider && <Divider />}
    </>
  );
}
