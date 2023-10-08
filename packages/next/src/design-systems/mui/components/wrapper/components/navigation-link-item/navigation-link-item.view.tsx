import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { ReactElement } from 'react';
import Text from '../../../../../../components/navigation-text';
import type NavigationText from '../../../../../../constants/navigation-text';
import useNavigationLinkItem from './navigation-link-item.hook';

interface Props {
  readonly depth: number;
  readonly path: string;
  readonly text: NavigationText;
}

export default function MuiWrapperNavigationLinkItem({
  depth,
  path,
  text,
}: Props): ReactElement {
  const { handleClick, selected, sx } = useNavigationLinkItem({
    depth,
    path,
    text,
  });

  return (
    <ListItemButton dense onClick={handleClick} selected={selected}>
      <ListItemText primary={<Text>{text}</Text>} sx={sx} />
    </ListItemButton>
  );
}
