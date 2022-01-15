import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { ReactElement } from 'react';
import type NavigationText from './constants/navigation-text';
import useWrapperMuiNavigationExternalLinkItem from './wrapper.mui-navigation-external-link-item.hook';
import Text from './wrapper.navigation-text.view';

interface Props {
  readonly depth: number;
  readonly text: NavigationText;
  readonly url: string;
}

export default function WrapperMuiNavigationExternalLinkItem({
  depth,
  text,
  url,
}: Readonly<Props>): ReactElement {
  const { handleClick, sx } = useWrapperMuiNavigationExternalLinkItem({
    depth,
    url,
  });

  return (
    <ListItemButton dense onClick={handleClick}>
      <ListItemText primary={<Text>{text}</Text>} sx={sx} />
    </ListItemButton>
  );
}
