import { type ReactElement } from 'react';
import Div from '../../../../components/div';
import Span from '../../../../components/span';
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
      <Div margin="small">
        <Span size="medium">
          <Name url={url}>{name}</Name>
        </Span>
      </Div>
    </li>
  );
}
