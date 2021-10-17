import Divider from '@mui/material/Divider';
import type { ReactElement } from 'react';
import type Props from './types/mui-navigation-root-item-props';
import Item from './wrapper.mui-navigation-item.view';

export default function WrapperMuiNavigationRootItem({
  divider,
  item,
}: Readonly<Props>): ReactElement {
  return (
    <>
      <Item>{item}</Item>
      {divider && <Divider />}
    </>
  );
}
