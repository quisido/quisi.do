import { type ReactElement } from 'react';
import mapUrlToHref from '../../utils/map-url-to-href.js';
import validateString from '../../utils/validate-string.js';
import styles from './content-security-policy-source-file.module.scss';
import formatLineColumnNumbers from './format-line-column-numbers.js';
import { Link } from '../../design-systems/template/index.js';

interface Props {
  readonly children: string;
  readonly columnNumber: number | null;
  readonly lineNumber: number | null;
}

const CLASS_NAME: string = validateString(styles['link']);

export default function ContentSecurityPolicySourceFile({
  children,
  columnNumber,
  lineNumber,
}: Props): ReactElement {
  const href: string | null = mapUrlToHref(children);
  const lineColumn: string | null = formatLineColumnNumbers(
    lineNumber,
    columnNumber,
  );

  if (href === null) {
    return (
      <code>
        {children}
        {lineColumn}
      </code>
    );
  }

  return (
    <Link className={CLASS_NAME} href={href} title="">
      {children}
      {lineColumn}
    </Link>
  );
}
