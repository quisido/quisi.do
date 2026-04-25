import { type ReactNode } from 'react';
import usePathname from '../hooks/use-pathname.js';
import validateString from '../utils/validate-string.js';
import styles from './header-heading-text.module.scss';
import { Link } from '../design-systems/template/index.js';

const TEXT_CLASS_NAME: string = validateString(styles['text']);

export default function HeaderHeadingText(): ReactNode {
  const pathname: string = usePathname();
  if (pathname === '/') {
    return 'quisi.do';
  }

  return (
    <Link href="/" title="quisi.do">
      <span className={TEXT_CLASS_NAME}>quisi.do</span>
    </Link>
  );
}
