import type { ReactElement } from 'react';
import type { StateLayoutProps } from '../shared/state-layout-props.js';
import Article from '../template/article.js';
import Main from '../template/main.js';
import Status from '../template/status.js';

/**
 *   The `StateLayout` is used for error, empty, and informational state pages
 * such as 404 Not Found, 500 Server Error, or "No results found." It features
 * an optional decorative illustration, a brief message, and a clear action to
 * get the user back on track.
 *   The status role communicates state information to assistive technologies as
 * a live region, ensuring that screen readers announce changes to the page
 * state.
 */
export default function StateLayout({
  action,
  children,
  heading,
  illustration,
  label,
  labelledBy,
}: StateLayoutProps): ReactElement {
  return (
    <Main label={label ?? 'Status'}>
      <Article heading={heading} label={label} labelledBy={labelledBy}>
        {illustration}
        <Status label={label ?? 'Status'}>{children}</Status>
        {action}
      </Article>
    </Main>
  );
}
