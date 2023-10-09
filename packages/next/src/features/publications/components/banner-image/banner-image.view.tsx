import Image from 'next/image.js';
import { type ReactElement } from 'react';
import validateString from '../../../../utils/validate-string';
import styles from './banner-image.module.scss';

interface Props {
  readonly src?: string | undefined;
  readonly title: string;
}

const imageClassName: string = validateString(styles.image);
const undefinedClassName: string = validateString(styles.undefined);

export default function PublicationsBannerImage({
  src,
  title,
}: Props): ReactElement {
  if (typeof src === 'undefined') {
    return <div className={undefinedClassName}>&nbsp;</div>;
  }

  return <Image alt={title} className={imageClassName} src={src} width={320} />;
}
