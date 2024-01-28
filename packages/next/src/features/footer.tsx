import { type ReactElement } from 'react';
import Link from '../components/link/index.js';

export default function Footer(): ReactElement | null {
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
