import type { BoxProps } from '@awsui/components-react/box';
import Box from '@awsui/components-react/box';
import type { ReactElement } from 'react';
import useFooter from './footer.hook';
import styles from './footer.module.scss';
import Link from './footer.view.link';

const MARGIN: BoxProps.Spacing = {
  top: 'l',
};

export default function Footer(): ReactElement {
  const { versionHref } = useFooter();

  return (
    <Box
      className={styles.root}
      color="text-label"
      margin={MARGIN}
      textAlign="center"
    >
      <span>&copy; Charles Stover</span>
      <span>
        <Link>{versionHref}</Link>
      </span>
    </Box>
  );
}
