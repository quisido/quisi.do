import type { ReactElement } from 'react';
import type { FeedArticle, FeedProps } from '../core/feed-props.js';
import useFeed from '../core/use-feed.js';
import useId from '../core/use-id.js';
import Heading from './heading.js';
import classes from './feed.module.scss';
import useLevel from '../core/use-level.js';

interface FeedArticleProps {
  readonly onFocus: VoidFunction;
  readonly positionInSet: number;
  readonly setSize?: number | undefined;
}

const UNKNOWN_SET_SIZE = -1;

const FeedArticleComponent = ({
  children,
  heading,
  labelledBy: labelledByProp,
  onFocus,
  positionInSet,
  setSize,
}: FeedArticle & FeedArticleProps): ReactElement => {
  const headingId: string = useId();
  const { level: headingLevel, ref: headingRef } = useLevel();

  return (
    <article
      aria-labelledby={labelledByProp ?? headingId}
      aria-posinset={positionInSet}
      aria-setsize={setSize}
      className={classes['article']}
      onFocus={onFocus}
      tabIndex={0}
    >
      <Heading id={headingId} level={headingLevel} ref={headingRef}>
        {heading}
      </Heading>
      {children}
    </article>
  );
};

/**
 *   A feed is a scrollable list of articles where scrolling might cause
 * articles to be added to or removed from either end of the list.
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
 * @see {@link https://w3c.github.io/aria/#feed | WAI-ARIA `feed` role}
 */
export default function Feed({
  articles,
  articlesOffset = 0,
  labelledBy,
  onAppend,
  onPrepend,
  setSize = UNKNOWN_SET_SIZE,
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
      aria-labelledby={labelledBy}
      className={classes['feed']}
      role="feed"
    >
      {errorMessage !== undefined && (
        <div id={errorMessageId}>{errorMessage}</div>
      )}
      {handlePrepend !== undefined && (
        <div>
          <button disabled={prepending} onClick={handlePrepend} type="button">
            Prepend articles
          </button>
        </div>
      )}
      {articles.map(
        (
          { key, ...articleProps }: FeedArticle,
          index: number,
        ): ReactElement => {
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
              key={key}
              onFocus={handleFocus}
              positionInSet={articlesOffset + index + 1}
              setSize={setSize}
            />
          );
        },
      )}
      {handleAppend !== undefined && (
        <div>
          <button disabled={appending} onClick={handleAppend} type="button">
            Append articles
          </button>
        </div>
      )}
    </section>
  );
}
