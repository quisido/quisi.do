import type { ReactElement } from 'react';
import type { FeedArticle, FeedProps } from '../shared/feed-props.js';
import useFeed from '../shared/use-feed.js';
import Article from './article.jsx';

/**
 *   A `Feed` component is a scrollable list of `Article` components where
 * articles may be added to or removed from either end of the list as the user
 * reads and scrolls through the content.
 * 
 * 
 *   A `Feed` component is a scrollable list of articles where scrolling might
 * cause articles to be added to or removed from either end of the list.
 *   A feed enables users to both read and scroll through a stream of rich
 * content that might continue scrolling infinitely by loading more content as
 * the user reads. In a feed, assistive technologies provide a web application
 * with signals of the user's reading cursor movement by moving user agent
 * focus, enabling the application to both add new content and visually position
 * content as the user browses the page.
 *   For example, a feed could be used to present a stream of news stories where
 * each article contains a story with text, links, images, and comments as well
 * as widgets for sharing and commenting. As a reads and interacts with each
 * story and moves the reading cursor from story to story, each story scrolls
 * into view and, as needed, new stories are loaded.
 *   A feed is a container element whose children have role article.
 * 
 *   Authors SHOULD avoid inserting or removing articles in the middle of a feed. These requirements help assistive technologies gracefully respond to changes in the feed content that occur simultaneously with user commands to move the reading cursor within the feed.

Authors SHOULD make each article in a feed focusable and ensure that the application scrolls an article into view when user agent focus is set on the article or one of its descendant elements. For example, in HTML, each article element should have a tabindex value of either -1 or 0.

When an assistive technology reading cursor moves from one article to another, assistive technologies SHOULD set user agent focus on the article that contains the reading cursor. If the reading cursor lands on a focusable element inside the article, the assistive technology MAY set focus on that element in lieu of setting focus on the containing article.

Because the ability to scroll to another article with an assistive technology reading cursor depends on the presence of another article in the page, authors SHOULD attempt to load additional articles before user agent focus reaches an article at either end of the set of articles that has been loaded. Alternatively, authors MAY include an article at either or both ends of the loaded set of articles that includes an element, such as a button, that lets the user request more articles to be loaded.

In addition to providing a brief label, authors MAY apply aria-describedby to article elements in a feed to suggest to screen readers which elements to speak after the label when users navigate by article. Screen readers MAY provide users with a way to quickly scan feed content by speaking both the label and accessible description when navigating by article, enabling the user to ignore repetitive or less important elements, such as embedded interaction widgets, that the author has left out of the description.

Authors SHOULD provide keyboard commands for moving focus among articles in a feed so users who do not utilize an assistive technology that provides article navigation features can use the keyboard to navigate the feed.

If the number of articles available in a feed supply is static, authors MAY specify aria-setsize on article elements in that feed. However, if the total number is extremely large, indefinite, or changes often, authors MAY set aria-setsize to -1 to communicate the unknown size of the set.
 * @see {@link https://w3c.github.io/aria/#feed | WAI-ARIA `feed` role}
 */
export default function Feed({
  articles,
  articlesOffset = 0,
  setSize,
}: FeedProps): ReactElement {
  const { busy } = useFeed();

  return (
    <section aria-busy={busy} role="feed">
      {articles.map(
        (
          { children, key, label }: FeedArticle,
          index: number,
        ): ReactElement => (
          <Article
            key={key}
            label={label}
            positionInSet={articlesOffset + index + 1}
            setSize={setSize}
          >
            {children}
          </Article>
        ),
      )}
    </section>
  );
}
