import type { ReactElement } from 'react';
import Box from '../../../../components/box';
import validateString from '../../../../utils/validate-string';
import Link from '../../components/footer-link';
import styles from './footer.module.scss';

const rootClassName: string = validateString(styles.root);

export default function Footer(): ReactElement {
  return (
    <Box className={rootClassName} marginTop="large">
      <Box color="label">&copy; Charles Stover</Box>
      <Box color="label">
        <Link />
      </Box>
    </Box>
  );
}
