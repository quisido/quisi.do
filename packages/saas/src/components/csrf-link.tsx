import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import { Link } from '../design-systems/template/index.js';

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
