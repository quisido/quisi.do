import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import type Project from '../../types/project';
import useProjectListItem from './home.view.project-list-item.hook';
import Name from './home.view.project-list-item-name';

export default function HomeProjectListItem({
  icon,
  name,
  url,
}: Project): ReactElement {
  const { style } = useProjectListItem({ icon });

  return (
    <li style={style}>
      <Box fontSize="heading-l" margin="s">
        <Name url={url}>{name}</Name>
      </Box>
    </li>
  );
}
