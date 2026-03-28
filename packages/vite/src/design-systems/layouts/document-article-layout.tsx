import type { ReactElement } from 'react';
import type { DocumentArticleLayoutProps } from '../shared/document-article-layout-props.js';
import Article from '../template/article.js';
import Complementary from '../template/complementary.js';
import Main from '../template/main.js';

/**
 *   The `DocumentArticleLayout` is a single-column layout optimized for
 * readability and typography. It is intended for terms of service, privacy
 * policies, blog posts, and other long-form content.
 *   An optional table of contents is rendered as a complementary landmark,
 * ensuring it is accessible but does not interfere with the primary reading
 * flow.
 */
export default function DocumentArticleLayout({
  children,
  heading,
  label,
  labelledBy,
  tableOfContents,
}: DocumentArticleLayoutProps): ReactElement {
  return (
    <Main label={label ?? 'Document'}>
      {tableOfContents !== undefined && (
        <Complementary>{tableOfContents}</Complementary>
      )}
      <Article heading={heading} label={label} labelledBy={labelledBy}>
        {children}
      </Article>
    </Main>
  );
}
