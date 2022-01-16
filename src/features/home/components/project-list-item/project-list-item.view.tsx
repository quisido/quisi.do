import type { ReactElement } from 'react';
import Box from '../../../../components/box';
import type Project from '../../../../types/project';
import validateString from '../../../../utils/validate-string';
import Name from '../../components/project-list-item-name';
import styles from './project-list-item.module.scss';
import useProjectListItem from './project-list-item.hook';

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
