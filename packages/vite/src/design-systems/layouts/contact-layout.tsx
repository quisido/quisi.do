import type { ReactElement } from 'react';
import type { ContactLayoutProps } from '../shared/contact-layout-props.js';
import Complementary from '../template/complementary.js';
import Main from '../template/main.js';

/**
 *   The `ContactLayout` is a split layout with a contact form on one side and
 * company information on the other. The form is rendered as the main content,
 * while the company information is rendered as complementary content.
 */
export default function ContactLayout({
  children,
  info,
  label,
}: ContactLayoutProps): ReactElement {
  return (
    <Main label={label}>
      {children}
      <Complementary>{info}</Complementary>
    </Main>
  );
}
