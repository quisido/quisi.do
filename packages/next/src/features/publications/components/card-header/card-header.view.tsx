import type { ReactElement } from 'react';
import Link from '../../../../components/link';
import Span from '../../../../components/span';
import validateString from '../../../../utils/validate-string';
import type Publication from '../../types/publication';
import styles from './card-header.module.scss';

const rootClassName: string = validateString(styles.root);

export default function PublicationsCardHeader({
  title,
  url,
}: Readonly<Publication>): ReactElement {
  return (
    <Link
      category="features/publications/card-header"
      className={rootClassName}
      href={url}
      title={title}
    >
      <Span color="inherit" size="medium-heading">
        {title}
      </Span>
    </Link>
  );
}
