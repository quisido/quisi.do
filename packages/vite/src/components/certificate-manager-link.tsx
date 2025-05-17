import type { ReactElement } from 'react';
import useBrowserBrand from '../hooks/use-browser-brand.js';
import Link from '../modules/quisi/link.jsx';

interface Props {
  readonly feature: string;
}

export default function CertificateManagerLink({
  feature,
}: Props): ReactElement {
  const browserBrand: string | null = useBrowserBrand();
  if (browserBrand === 'Edge') {
    /**
     * Microsoft Edge blocks links to `edge://` URLs.
     *
     * return (
     *   <Link
     *     feature={feature}
     *     href="edge://settings/?search=Manage%20certificates"
     *     title="Manage certificates"
     *   >
     *     Microsoft Edge's certificate manager
     *   </Link>
     * );
     */
    return <code>edge://settings/?search=Manage%20certificates</code>;
  }

  return (
    <Link
      feature={feature}
      href="chrome://certificate-manager/localcerts/usercerts"
      title="Certificate Manager"
    >
      Google Chrome's certificate manager
    </Link>
  );
}
