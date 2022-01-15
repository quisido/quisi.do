import Divider from '@mui/material/Divider';
import type { ReactElement } from 'react';
import Item from '../../components/mui-navigation-item';
import type Props from '../../types/mui-navigation-root-item-props';

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
