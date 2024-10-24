'use client';

import { useRouter } from 'next/navigation.js';
import { useEffect, type MouseEvent, type ReactElement, type ReactNode } from 'react';
import innerText from 'react-innertext';
import useTheme from '../../hooks/use-theme.js';

interface BaseProps {
  readonly children?: ReactNode;
  readonly className?: string | undefined;
  readonly feature: string; // Used for tracking events
  readonly follow?: boolean | undefined;
  readonly label?: string | undefined;
  readonly title: string;
}

interface HrefProps {
  readonly href: string;
  readonly onClick?: (() => boolean) | undefined;
}

interface OnClickProps {
  readonly href?: string | undefined;
  readonly onClick: () => undefined;
}

export type Props = BaseProps & (HrefProps | OnClickProps);

export default function Link({
  children,
  className,
  feature,
  follow = true,
  href,
  label: ariaLabel,
  onClick,
  title,
}: Props): ReactElement {
  // Contexts
  const emit = (..._args: unknown[])=>{};// useEmit();
  const router = useRouter();
  const { primaryHex } = useTheme();

  // Effects
  useEffect((): void => {
    if (typeof href === 'undefined') {
      return;
    }

    router.prefetch(href);
  }, [href, router]);

  const getRel = (): string => {
    const rels: string[] = ['noopener'];
    if (!follow) {
      rels.push('nofollow');
    }

    return rels.join(' ');
  };

  const rel: string | undefined = getRel();
  return (
    <a
      aria-label={ariaLabel}
      className={className}
      href={href}
      rel={rel}
      title={title}
      onClick={(e: MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        emit('click', {
          feature,
          label: innerText(children),
          url: href,
        });

        if (typeof onClick === 'function') {
          const preventDefault: boolean | undefined = onClick();
          if (preventDefault === true) {
            return;
          }
        }

        if (typeof href === 'string') {
          router.push(href);
        }
      }}
      style={{
        color: primaryHex,
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
}
