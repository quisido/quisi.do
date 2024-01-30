import { type ReactElement, memo } from 'react';
import Link from '../components/link/index.js';

function Footer(): ReactElement | null {
  return (
    <footer style={{ textAlign: 'center' }}>
      <Link
        feature="footer/privacy-policy"
        href="/privacy"
        title="quisi.do privacy policy"
      >
        Privacy Policy
      </Link>
    </footer>
  );
}

export default memo(Footer);
