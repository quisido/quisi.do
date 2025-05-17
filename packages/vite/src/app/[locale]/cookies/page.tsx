import { type ReactElement } from 'react';
import CookiePolicy from '../../../features/cookie-policy.js';

export { default as generateStaticParams } from '../../../features/generate-locale-static-params.js';

export default function CookiesPage(): ReactElement {
  return <CookiePolicy />;
}
