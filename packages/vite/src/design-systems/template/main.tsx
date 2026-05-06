import type { ReactElement } from 'react';
import type { MainProps } from '../core/main-props.js';
import classes from './main.module.scss';

/**
 * The main landmark contains the main content of a document.
 * This marks the content that is directly related to or expands upon the
 * central topic of the document. It is a non-obtrusive alternative for "skip to
 * main content" links.
 * @see {@link https://w3c.github.io/aria/#main | WAI-ARIA `main` role}
 */
export default function Main({ children }: MainProps): ReactElement {
  return <main className={classes['main']}>{children}</main>;
}
