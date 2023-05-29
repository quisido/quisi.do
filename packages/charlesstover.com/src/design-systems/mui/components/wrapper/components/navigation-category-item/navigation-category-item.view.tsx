import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import type { ReactElement, ReactNode } from 'react';
import Text from '../../../../../../components/navigation-text';
import type NavigationText from '../../../../../../constants/navigation-text';
import useNavigationCategoryItem from './navigation-category-item.hook';

interface Props {
  readonly children: ReactNode;
  readonly defaultExpanded: boolean;
  readonly depth: number;
  readonly text: NavigationText;
}

export default function WrapperMuiNavigationCategoryItem({
  children,
  defaultExpanded,
  depth,
  text,
}: Readonly<Props>): ReactElement {
  const { dense, expanded, handleClick, sx } = useNavigationCategoryItem({
    defaultExpanded,
    depth,
  });

  return (
    <>
      <ListItemButton dense={dense} onClick={handleClick}>
        <ListItemText primary={<Text>{text}</Text>} sx={sx} />
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}
