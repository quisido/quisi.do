import type { ReactElement } from 'react';
import type { NoteProps } from '../core/note-props.js';
import classes from './note.module.scss';

/**
 *   A note section represents additional information or parenthetical context
 * to the primary content it supplements.
 *   A note is content provided by the author of the page or document, it is not
 * to be used for providing reactions or suggestions. For these purposes, please
 * review comment and suggestion.
 *   When used within the normal flow of a page's content, a note has an
 * implicit association with the content that it supplements. The following
 * example demonstrates using a note to call out additional information in the
 * natural reading order of a page:
 * ```tsx
 * <Paragraph>
 *   ... the following results outline support for the tested features.
 * </Paragraph>
 * <Note>
 *   <Paragraph>
 *     Please keep in mind that at the time of publishing this page all results
 *     were accurate.
 *   </Paragraph>
 *   <Paragraph>
 *     If you find any variations in results, please let us know!
 *   </Paragraph>
 * </Note>
 * <Paragraph>...</Paragraph>
 * ```
 *   In cases where a note has been determined to need a programmatic
 * association with the content it supplements, use one of the following
 * mechanisms to associate the elements:
 * - If the note contains structured or interactive content (for example, a
 *   link, button, list, table, etc.) use aria-details.
 * - If the note is brief and consists of static text, use aria-describedby.
 * ```tsx
 * // using aria-details to reference a note containing a link
 * <Button detailsId="example-note">Get Started</Button>
 * <Note id="example-note">
 *   <Paragraph>Need more information before you get started?</Paragraph>
 *   <Paragraph>
 *     Visit our <Link href="...">product description page</Link> to get all the
 *     information you need.
 *   </Paragraph>
 * </Note>
 * ```
 * @see {@link https://w3c.github.io/aria/#note | WAI-ARIA `note` role}
 */
export default function Note({ children, id }: NoteProps): ReactElement {
  return (
    <div className={classes['root']} id={id} role="note">
      {children}
    </div>
  );
}
