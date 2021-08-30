import { Link } from '@awsui/components-react';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import VERSION from '../../constants/version';
import useFooterLink from './footer.hook.link';

export default function FooterLink(): ReactElement {
  const { versionHref } = useFooterLink();

  if (typeof versionHref === 'undefined') {
    return <>v{VERSION}</>;
  }

  return (
    <I18n
      version={
        <Link href={versionHref} target="_blank">
          {VERSION}
        </Link>
      }
    >
      version: $version
    </I18n>
  );
}
