import type { ReactElement } from 'react';
import Link from '../../../../components/link';
import validateString from '../../../../utils/validate-string';
import src from '../../images/message-in-a-bottle.png';
import useMessageInABottle from './message-in-a-bottle.hook';
import styles from './message-in-a-bottle.module.scss';

const HEIGHT = 22; // AWS UI header line height
const imageClassName: string = validateString(styles.image);
const ORIGINAL_HEIGHT = 104;
const ORIGINAL_WIDTH = 68;

const ASPECT_RATIO: number = ORIGINAL_HEIGHT / ORIGINAL_WIDTH;
const WIDTH: number = HEIGHT / ASPECT_RATIO;

export default function MessageInABottle(): ReactElement {
  const { alt } = useMessageInABottle();

  return (
    <Link
      category="easter-egg/message-in-a-bottle"
      href="/images/new-horizons.jpg"
      title=""
    >
      <img
        alt={alt}
        className={imageClassName}
        height={HEIGHT}
        src={src}
        width={WIDTH}
      />
    </Link>
  );
}
