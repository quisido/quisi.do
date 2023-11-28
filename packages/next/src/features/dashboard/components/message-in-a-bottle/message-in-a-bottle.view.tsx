import { type ReactElement } from 'react';
import Link from '../../../../components/link';
import validateString from '../../../../utils/validate-string';
import newHorizons from '../../../../images/new-horizons.jpg';
import useMessageInABottle from './message-in-a-bottle.hook';
import styles from './message-in-a-bottle.module.scss';

const rootClassName: string = validateString(styles.root);

export default function MessageInABottle(): ReactElement {
  const { label } = useMessageInABottle();

  return (
    <Link
      category="easter-egg/message-in-a-bottle"
      className={rootClassName}
      href={newHorizons.src}
      label={label}
      title=""
    />
  );
}
