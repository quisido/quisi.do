import { memo, type ReactElement } from 'react';
import validateString from '../utils/validate-string.js';
import styles from './footer.module.scss';
import StatusBar from './status-bar.jsx';

const CLASS_NAME: string = validateString(styles['footer']);
// Const LIST_CLASS_NAME: string = validateString(styles['list']);

function Footer(): ReactElement | null {
  return (
    <footer className={CLASS_NAME}>
      {/* <ul className={LIST_CLASS_NAME}>
        <li>
          <Link
            feature="footer"
            href="/cookies/"
            title="quisi.do cookie policy"
          >
            <I18n>Cookie policy</I18n>
          </Link>
        </li>
        <li>
          <Link
            feature="footer"
            href="/privacy/"
            title="quisi.do privacy policy"
          >
            <I18n>Privacy policy</I18n>
          </Link>
        </li>
        <li>
          <Link feature="footer" href="/tos/" title="quisi.do terms of service">
            <I18n>Terms of service</I18n>
          </Link>
        </li>
      </ul> */}
      <StatusBar />
    </footer>
  );
}

export default memo(Footer);
