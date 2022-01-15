import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { ReactElement } from 'react';
import type NavigationText from './constants/navigation-text';
import useWrapperMuiNavigationLinkItem from './wrapper.mui-navigation-link-item.hook';
import Text from './wrapper.navigation-text.view';

interface Props {
  readonly depth: number;
  readonly path: string;
  readonly text: NavigationText;
}

export default function WrapperMuiNavigationLinkItem({
  depth,
  path,
  text,
}: Readonly<Props>): ReactElement {
  const { handleClick, selected, sx } = useWrapperMuiNavigationLinkItem({
    depth,
    path,
  });

  return (
    <ListItemButton dense onClick={handleClick} selected={selected}>
      <ListItemText primary={<Text>{text}</Text>} sx={sx} />
    </ListItemButton>
  );
}
