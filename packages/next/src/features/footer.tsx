import { type ReactElement, memo } from 'react';
import Link from '../components/link/index.js';
import styles from './footer.module.scss';

function Footer(): ReactElement | null {
  return (
    <footer
      style={{
        paddingTop: '1rem',
        textAlign: 'center',
      }}
    >
      <ul className={styles['list']}>
        <li>
          <Link
            feature="footer"
            href="/cookies/"
            title="quisi.do cookie policy"
          >
            cookie policy
          </Link>
        </li>
        <li>
          <Link
            feature="footer"
            href="/privacy/"
            title="quisi.do privacy policy"
          >
            privacy policy
          </Link>
        </li>
        <li>
          <Link feature="footer" href="/tos/" title="quisi.do terms of service">
            terms of service
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default memo(Footer);
