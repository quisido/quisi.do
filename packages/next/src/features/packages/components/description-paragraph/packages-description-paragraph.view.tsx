import { type PropsWithChildren, type ReactElement } from 'react';
import Span from '../../../../components/span';
import validateString from '../../../../utils/validate-string';
import styles from './packages-description-paragraph.module.scss';

const className: string = validateString(styles.root);

export default function PackageDescriptionParagraph({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return (
    <Span className={className} color="secondary-body" element="p" size="small">
      {children}
    </Span>
  );
}
