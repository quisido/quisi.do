import type { ReactElement } from 'react';
import type { FeedLayoutProps } from '../shared/feed-layout-props.js';
import Main from '../template/main.js';
import Toolbar from '../template/toolbar.js';

/**
 *   The `FeedLayout` is an endless-scrolling list of content, presented as
 * either a single column (like a social media feed) or a masonry grid.
 *   An optional filter and sort toolbar is rendered above the feed content,
 * enabling users to control the feed without navigating away.
 */
export default function FeedLayout({
  children,
  filters,
  label,
}: FeedLayoutProps): ReactElement {
  return (
    <Main label={label}>
      {filters !== undefined && (
        <Toolbar label="Feed controls">{filters}</Toolbar>
      )}
      {children}
    </Main>
  );
}
