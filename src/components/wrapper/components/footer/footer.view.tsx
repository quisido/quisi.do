import type { ReactElement } from 'react';
import Box from '../../../../components/box';
import Color from '../../../../components/color';
import validateString from '../../../../utils/validate-string';
import Link from '../../components/footer-link';
import styles from './footer.module.scss';

const rootClassName: string = validateString(styles.root);

export default function Footer(): ReactElement {
  return (
    <Box className={rootClassName} marginTop="large">
      <Color value="label">&copy; Charles Stover</Color>
      <Color value="label">
        <Link />
      </Color>
    </Box>
  );
}
