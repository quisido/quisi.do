import type { ReactElement } from 'react';
import type { ArticleProps } from '../shared/article-props.js';
import useArticle from '../shared/use-article.js';
import Heading from './heading.jsx';
import HeadingLevelProvider from '../shared/heading-level-provider.jsx';

/**
 *   An `Article` component is a section of a page that consists of a
 * composition that forms an independent part of a document, page, or site.
 *   An article is not a navigational landmark, but can be nested to form a
 * discussion where assistive technologies could pay attention to article
 * nesting to assist the user in following the discussion. An article could be a
 * forum post, a magazine or newspaper article, a web log entry, a
 * user-submitted comment, or any other independent item of content. It is
 * independent in that its contents could stand alone, for example in
 * syndication. However, the element is still associated with its ancestors; for
 * instance, contact information that applies to a parent body element still
 * covers the article as well. When nesting articles, the child articles
 * represent content that is related to the content of the parent article. For
 * instance, a web log entry on a site that accepts user-submitted comments
 * could represent the comments as articles nested within the article for the
 * web log entry. Author, heading, date, or other information associated with an
 * article does not apply to nested articles.
 *   When an article is in the context of a feed, you may specify its
 * position-in-set and set-size.
 * @see {@link https://w3c.github.io/aria/#article | WAI-ARIA `article` role}
 */
export default function Article({
  children,
  heading,
  label,
  labelledBy: labelledByProp,
  positionInSet,
  setSize,
}: ArticleProps): ReactElement {
  const { headingId, labelledBy, level } = useArticle({
    heading,
    label,
    labelledBy: labelledByProp,
  });

  if (heading === undefined) {
    return (
      <article
        aria-label={label}
        aria-labelledby={labelledBy}
        aria-posinset={positionInSet}
        aria-setsize={setSize}
      >
        {children}
      </article>
    );
  }

  return (
    <article
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-posinset={positionInSet}
      aria-setsize={setSize}
    >
      <Heading id={headingId} level={level}>
        {heading}
      </Heading>
      <HeadingLevelProvider>{children}</HeadingLevelProvider>
    </article>
  );
}
