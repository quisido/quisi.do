import { type ReactElement } from 'react';
import Link from '../../../../components/link/index.js';
import validateString from '../../../../utils/validate-string.js';
import newHorizons from '../../../../images/new-horizons.jpg';
import useMessageInABottle from './message-in-a-bottle.hook.js';
import styles from './message-in-a-bottle.module.scss';

const rootClassName: string = validateString(styles['root']);

export default function MessageInABottle(): ReactElement {
  const { label } = useMessageInABottle();

  return (
    <Link
      className={rootClassName}
      feature="easter-egg/message-in-a-bottle"
      href={newHorizons.src}
      label={label}
      title=""
    />
  );
}
