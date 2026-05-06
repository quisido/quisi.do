import type {
  HTMLAttributeAnchorTarget,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
} from 'react';
import type { LinkProps } from '../core/link-props.js';
import classes from './link.module.scss';
import validateString from '../../utils/validate-string.js';

const linkClassName: string = validateString(classes['link']);

/**
 * A link is an interactive reference to an internal or external resource
 * that, when activated, causes the user agent to navigate to that resource.
 * @see {@link https://w3c.github.io/aria/#link | WAI-ARIA `link` role}
 */
export default function Link({
  children,
  className,
  href,
  onClick,
  title,
}: LinkProps): ReactElement {
  const isExternal: boolean = /^(?:https?:)?\/\//u.test(href);

  const handleClick = ((): MouseEventHandler<HTMLAnchorElement> | undefined => {
    if (onClick === undefined) {
      return;
    }

    return (ev: MouseEvent<HTMLAnchorElement>): void => {
      ev.preventDefault();
      onClick();
    };
  })();

  const rel = ((): string | undefined => {
    if (!isExternal) {
      return;
    }

    return 'nofollow noopener noreferrer';
  })();

  const target = ((): HTMLAttributeAnchorTarget | undefined => {
    if (!isExternal) {
      return;
    }

    return '_blank';
  })();

  const classNames: string[] = [linkClassName];

  if (className !== undefined) {
    classNames.push(className);
  }

  /**
   * Where possible, it is recommended that you use a native <a> element
   * rather than another element with `role="link"`, as native elements are more
   * widely supported by user agents and assistive technology. Native <a>
   * elements also support keyboard and focus requirements by default, without
   * need for additional customization.
   */
  return (
    <a
      className={classNames.join(' ')}
      href={href}
      onClick={handleClick}
      rel={rel}
      target={target}
      title={title}
    >
      {children}
    </a>
  );
}
