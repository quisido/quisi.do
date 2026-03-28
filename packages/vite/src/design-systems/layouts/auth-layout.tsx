import type { ReactElement } from 'react';
import type { AuthLayoutProps } from '../shared/auth-layout-props.js';
import Article from '../template/article.js';
import Main from '../template/main.js';

/**
 *   The `AuthLayout` is an isolated, distraction-free layout for login, sign
 * up, and password reset pages. It features a centered form area, optionally
 * accompanied by decorative media on one side.
 *   The form is wrapped in an article landmark with an accessible heading or
 * label, ensuring assistive technologies can communicate the page's purpose.
 */
export default function AuthLayout({
  children,
  heading,
  label,
  labelledBy,
  media,
}: AuthLayoutProps): ReactElement {
  return (
    <Main label={label ?? 'Authentication'}>
      {media}
      <Article heading={heading} label={label} labelledBy={labelledBy}>
        {children}
      </Article>
    </Main>
  );
}
