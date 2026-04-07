import type { ReactElement } from 'react';
import OwnsBanner from '../core/owns-banner.js';
import Banner from './banner.js';
import type { DocumentProps } from '../core/document-props.js';
import ContentInfo from './content-info.js';
import OwnsContentInfo from '../core/owns-content-info.js';

/**
 *   A `Document` component contains content that users may want to browse in a
 * reading mode.
 *   When user agent focus moves to an element assigned the role of document,
 * assistive technologies having a reading mode for browsing static content may
 * switch to that reading mode and intercept standard input events, such as Up
 * or Down arrow keyboard events, to control the reading cursor.
 *   Because assistive technologies that have a reading mode default to that
 * mode for all elements except for widgets and applications, the only
 * circumstance where a document is useful for changing assistive technology
 * behavior is when it is a focusable child of a widget or application. For
 * example, given an application which contains some static rich text, you can
 * use a document to contain the text and give it a tabindex of 0. When a screen
 * reader user presses the Tab key and places focus on the document, the user
 * will be able to read the text with the screen reader's reading cursor.
 */
export default function Document({
  banner,
  children,
  contentInfo,
  tabIndex,
}: DocumentProps): ReactElement {
  return (
    <div role="document" tabIndex={tabIndex}>
      <OwnsBanner>
        <OwnsContentInfo>
          {banner !== undefined && <Banner>{banner}</Banner>}
          {children}
          {contentInfo !== undefined && (
            <ContentInfo>{contentInfo}</ContentInfo>
          )}
        </OwnsContentInfo>
      </OwnsBanner>
    </div>
  );
}
