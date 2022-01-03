import type { ReactElement } from 'react';
import Box from '../../components/box';
import type Project from '../../types/project';
import useProjectListItem from './home.project-list-item.hook';
import Name from './home.project-list-item-name.view';
import styles from './home.project-list-item.module.scss';
import validateString from '../../utils/validate-string';

const rootClassName: string = validateString(styles.root);

export default function HomeProjectListItem({
  icon,
  name,
  url,
}: Project): ReactElement {
  const { style } = useProjectListItem({ icon });

  return (
    <li className={rootClassName} style={style}>
      <Box margin="small" size="medium">
        <Name url={url}>{name}</Name>
      </Box>
    </li>
  );
}
