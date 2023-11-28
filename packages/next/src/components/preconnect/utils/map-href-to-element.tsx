import { type ReactElement } from 'react';

export default function mapHrefToElement(href: string): ReactElement {
  return <link href={href} key={href} rel="preconnect" />;
}
