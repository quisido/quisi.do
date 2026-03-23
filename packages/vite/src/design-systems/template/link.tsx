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
 *   The `Link` component provides an interactive hyperlink to a resource that
 * is in the application or external.
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
