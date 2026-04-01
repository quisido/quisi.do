import type { ReactElement } from 'react';
import type { FeedProps } from '../shared/feed-props.js';
import useFeed from '../shared/use-feed.js';
import type { FeedArticle } from '../shared/feed-article.js';
import useHeadingOrLabel from '../shared/use-heading-or-label.js';
import useId from '../shared/use-id.js';
import Heading from './heading.js';
import HeadingLevelProvider from '../shared/heading-level-provider.js';
import useHeadingLevel from '../shared/use-heading-level.js';

interface FeedArticleProps {
  readonly onFocus: VoidFunction;
  readonly positionInSet: number;
  readonly setSize?: number | undefined;
}

const FeedArticleComponent = ({
  children,
  heading,
  label,
  labelledBy: labelledByProp,
  onFocus,
  positionInSet,
  setSize,
}: FeedArticle & FeedArticleProps): ReactElement => {
  const headingId: string = useId();
  const headingLevel: number = useHeadingLevel();
  const labelledBy: string | undefined = useHeadingOrLabel({
    heading,
    headingId,
    label,
    labelledBy: labelledByProp,
  });

  return (
    <article
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-posinset={positionInSet}
      aria-setsize={setSize}
      onFocus={onFocus}
      tabIndex={0}
    >
      <Heading id={headingId} level={headingLevel}>
        {heading}
      </Heading>
      <HeadingLevelProvider increment={heading !== undefined}>
        {children}
      </HeadingLevelProvider>
    </article>
  );
};

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
 *   A feed is a container element whose children are articles.
 *   Avoid inserting or removing articles in the middle of a feed. These
 * requirements help assistive technologies gracefully respond to changes in the
 * feed content that occur simultaneously with user commands to move the reading
 * cursor within the feed.
 *   



In addition to providing a brief label, authors MAY apply aria-describedby to article elements in a feed to suggest to screen readers which elements to speak after the label when users navigate by article. Screen readers MAY provide users with a way to quickly scan feed content by speaking both the label and accessible description when navigating by article, enabling the user to ignore repetitive or less important elements, such as embedded interaction widgets, that the author has left out of the description.

Authors SHOULD provide keyboard commands for moving focus among articles in a feed so users who do not utilize an assistive technology that provides article navigation features can use the keyboard to navigate the feed.

If the number of articles available in a feed supply is static, authors MAY specify aria-setsize on article elements in that feed. However, if the total number is extremely large, indefinite, or changes often, authors MAY set aria-setsize to -1 to communicate the unknown size of the set.
 * @see {@link https://w3c.github.io/aria/#feed | WAI-ARIA `feed` role}
 */
export default function Feed({
  articles,
  articlesOffset = 0,
  label,
  labelledBy,
  onAppend,
  onPrepend,
  setSize,
}: FeedProps): ReactElement {
  const {
    appending,
    busy,
    errorMessage,
    errorMessageId,
    handleAppend,
    handlePrepend,
    prepending,
  } = useFeed({
    onAppend,
    onPrepend,
  });

  return (
    <section
      aria-busy={busy}
      aria-errormessage={errorMessageId}
      aria-label={label}
      aria-labelledby={labelledBy}
      role="feed"
    >
      {errorMessage !== undefined && (
        <div id={errorMessageId}>{errorMessage}</div>
      )}
      {handlePrepend !== undefined && (
        <div>
          <button disabled={prepending} onClick={handlePrepend}>
            Prepend articles
          </button>
        </div>
      )}
      {articles.map(
        (articleProps: FeedArticle, index: number): ReactElement => {
          const handleFocus = (): void => {
            // At the second article, prepend more.
            if (index <= 1 && handlePrepend) {
              handlePrepend();
            }

            // At the second-to-last article, append more.
            // eslint-disable-next-line no-magic-numbers
            if (index >= articles.length - 2 && handleAppend) {
              handleAppend();
            }
          };

          return (
            <FeedArticleComponent
              {...articleProps}
              onFocus={handleFocus}
              positionInSet={articlesOffset + index + 1}
              setSize={setSize}
            />
          );
        },
      )}
      {handleAppend !== undefined && (
        <div>
          <button disabled={appending} onClick={handleAppend}>
            Append articles
          </button>
        </div>
      )}
    </section>
  );
}
