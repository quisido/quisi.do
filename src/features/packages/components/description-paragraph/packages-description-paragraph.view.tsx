import type { PropsWithChildren, ReactElement } from 'react';
import Box from '../../../../components/box';
import validateString from '../../../../utils/validate-string';
import styles from './packages-description-paragraph.module.scss';

const className: string = validateString(styles.root);

export default function PackageDescriptionParagraph({
  children,
}: Readonly<PropsWithChildren<unknown>>): ReactElement {
  return (
    <Box className={className} color="secondary-body" element="p" size="small">
      {children}
    </Box>
  );
}
