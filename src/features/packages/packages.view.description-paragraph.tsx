import Box from '@awsui/components-react/box';
import type { PropsWithChildren, ReactElement } from 'react';
import styles from './packages.view.description-paragraph.module.scss';

export default function PackageDescriptionParagraph({
  children,
}: Readonly<PropsWithChildren<unknown>>): ReactElement {
  return (
    <Box
      className={styles.root}
      color="text-body-secondary"
      fontSize="body-s"
      variant="p"
    >
      {children}
    </Box>
  );
}
