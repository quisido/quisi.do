import type { ReactElement } from 'react';
import Box from '../../components/box';
import type Project from '../../types/project';
import useProjectListItem from './home.project-list-item.hook';
import Name from './home.project-list-item-name.view';

export default function HomeProjectListItem({
  icon,
  name,
  url,
}: Project): ReactElement {
  const { style } = useProjectListItem({ icon });

  return (
    <li style={style}>
      <Box margin="small">
        <Name url={url}>{name}</Name>
      </Box>
    </li>
  );
}
