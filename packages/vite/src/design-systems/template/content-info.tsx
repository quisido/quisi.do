import type { ReactElement } from 'react';
import type { ContentInfoProps } from '../core/content-info-props.js';
import useContentInfo from '../core/use-content-info.js';

/**
 *   Content info landmarks contains information about the parent document.
 * Examples of information are copyrights and links to privacy statements.
 *   A page should have at most one content info landmark.
 * @see {@link https://w3c.github.io/aria/#contentinfo | WAI-ARIA `contentinfo` role}
 */
export default function ContentInfo({
  children,
}: ContentInfoProps): ReactElement {
  const id: string = useContentInfo();

  return <footer id={id}>{children}</footer>;
}
