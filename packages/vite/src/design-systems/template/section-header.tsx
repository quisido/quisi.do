import type { ReactElement } from 'react';
import type { SectionHeaderProps } from '../core/section-header-props.js';
import classes from './section-header.module.scss';

/**
 *   A section header is a set of user interface objects and information that
 * represents a collection of introductory items for the element's closest
 * ancestral content group. For instance, a section header can include the
 * heading, introductory statement and related meta data for a section of
 * content, for instance a region or article, within a web page.
 *   A section header does not represent site-oriented or globally repeating
 * content found across multiple pages of a website. For such content, a banner
 * would be more appropriate.
 * @see {@link https://w3c.github.io/aria/#sectionheader | WAI-ARIA `sectionheader` role}
 */
export default function SectionHeader({
  children,
}: SectionHeaderProps): ReactElement {
  return (
    <header className={classes['root']} role="sectionheader">
      {children}
    </header>
  );
}
