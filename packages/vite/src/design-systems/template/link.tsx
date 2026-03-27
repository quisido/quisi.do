import type {
  HTMLAttributeAnchorTarget,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';

export interface LinkProps {
  readonly children: ReactNode;
  readonly className?: string | undefined;
  readonly href: string;
  readonly onClick?: (() => void) | undefined;
  readonly title?: string | undefined;
}

/**
 *   A `Link` component is an interactive reference to an internal or external
 * resource that, when activated, causes the user agent to navigate to that
 * resource.
 * @see https://w3c.github.io/aria/#link
 */
export default function Link({
  children,
  className,
  href,
  onClick,
  title,
}: LinkProps): ReactElement {
  const handleClick = ((): MouseEventHandler<HTMLAnchorElement> | undefined => {
    if (onClick === undefined) {
      return;
    }

    return (ev: MouseEvent<HTMLAnchorElement>): void => {
      ev.preventDefault();
      onClick();
    };
  })();

  const rel = ((): string => {
    if (href.startsWith('http')) {
      return 'nofollow noopener noreferrer';
    }

    return 'noreferrer';
  })();

  const target = ((): HTMLAttributeAnchorTarget | undefined => {
    if (!href.startsWith('http')) {
      return;
    }

    return '_blank';
  })();

  /**
   *   Where possible, it is recommended that you use a native <a> element
   * rather than another element with `role="link"`, as native elements are more
   * widely supported by user agents and assistive technology. Native <a>
   * elements also support keyboard and focus requirements by default, without
   * need for additional customization.
   */
  return (
    <a
      className={className}
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
