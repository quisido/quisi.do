import { type ReactElement } from 'react';
import { Link } from './design-system.js';
import I18n from './i18n.js';

export default function CsrfLink(): ReactElement {
  return (
    <Link
      href="https://en.wikipedia.org/wiki/Cross-site_request_forgery"
      title="Cross-site request forgery - Wikipedia"
    >
      <I18n>cross-site request forgery</I18n>
    </Link>
  );
}
