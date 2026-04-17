import type { ReactElement } from 'react';
import type { SectionFooterProps } from '../core/section-footer-props.js';
import classes from './section-footer.module.scss';

/**
 *   A section footer is a set of user interface objects and information
 * representing information about its closest ancestral content group. For
 * instance, a section footer can include information about who wrote the
 * specific section of content, such as an article. It can contain links to
 * related documents, copyright information or other indices and colophon
 * specific to the current section of the page.
 *   A section footer does not represent information about the parent document,
 * or globally repeating content found across multiple pages related to the
 * website. For such content, content info would be more appropriate.
 * @see {@link https://w3c.github.io/aria/#sectionfooter | WAI-ARIA `sectionfooter` role}
 */
export default function SectionFooter({
  children,
}: SectionFooterProps): ReactElement {
  return (
    <footer className={classes['section-footer']} role="sectionfooter">
      {children}
    </footer>
  );
}
