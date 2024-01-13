import { type ReactElement } from 'react';
import Link from '../../../../components/link/index.js';
import Span from '../../../../components/span/index.js';
import validateString from '../../../../utils/validate-string.js';
import type Publication from '../../types/publication.js';
import styles from './card-header.module.scss';

const rootClassName: string = validateString(styles['root']);

export default function PublicationsCardHeader({
  title,
  url,
}: Readonly<Publication>): ReactElement {
  return (
    <Link
      className={rootClassName}
      feature="publications/card-header"
      href={url}
      title={title}
    >
      <Span color="inherit" size="medium-heading">
        {title}
      </Span>
    </Link>
  );
}
