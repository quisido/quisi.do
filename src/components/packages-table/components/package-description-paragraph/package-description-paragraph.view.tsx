import Box from '@awsui/components-react/box';
import { PropsWithChildren, ReactElement } from 'react';
import styles from './package-description-paragraph.module.scss';

export default function PackageDescriptionParagraph({
  children,
}: PropsWithChildren<unknown>): ReactElement {
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
