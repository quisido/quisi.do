import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { ReactElement } from 'react';
import Text from '../../../../../../components/navigation-text';
import type NavigationText from '../../../../../../constants/navigation-text';
import useNavigationExternalLinkItem from './navigation-external-link-item.hook';

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
  const { handleClick, sx } = useNavigationExternalLinkItem({
    depth,
    text,
    url,
  });

  return (
    <ListItemButton dense onClick={handleClick}>
      <ListItemText primary={<Text>{text}</Text>} sx={sx} />
    </ListItemButton>
  );
}
