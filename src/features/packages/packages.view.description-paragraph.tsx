import Box from '@awsui/components-react/box';
import type { PropsWithChildren, ReactElement } from 'react';
import validateString from '../../utils/validate-string';
import styles from './packages.view.description-paragraph.module.scss';

const className: string = validateString(styles.root);

export default function PackageDescriptionParagraph({
  children,
}: Readonly<PropsWithChildren<unknown>>): ReactElement {
  return (
    <Box
      className={className}
      color="text-body-secondary"
      fontSize="body-s"
      variant="p"
    >
      {children}
    </Box>
  );
}
