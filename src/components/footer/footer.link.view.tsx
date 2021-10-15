import { Link } from '@awsui/components-react';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import GITHUB_COMMIT_URL from '../../constants/github-commit-url';
import GITHUB_REPOSITORY_URL from '../../constants/github-repository-url';
import VERSION from '../../constants/version';

const VERSION_HREF: string | undefined =
  GITHUB_COMMIT_URL ?? GITHUB_REPOSITORY_URL;

export default function FooterLink(): ReactElement {
  if (typeof VERSION_HREF === 'undefined') {
    return <>v{VERSION}</>;
  }

  return (
    <I18n
      version={
        <Link href={VERSION_HREF} target="_blank">
          {VERSION}
        </Link>
      }
    >
      version: $version
    </I18n>
  );
}
