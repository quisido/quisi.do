import type { ReactElement } from 'react';
import type { ContentInfoProps } from '../core/content-info-props.js';
import classes from './content-info.module.scss';

/**
 *   Content info landmarks contains information about the parent document.
 * Examples of information are copyrights and links to privacy statements.
 *   A page should have at most one content info landmark.
 * @see {@link https://w3c.github.io/aria/#contentinfo | WAI-ARIA `contentinfo` role}
 */
export default function ContentInfo({
  children,
}: ContentInfoProps): ReactElement {
  return <footer className={classes['content-info']}>{children}</footer>;
}
