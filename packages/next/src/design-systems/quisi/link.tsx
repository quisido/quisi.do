import { useRouter } from 'next/navigation.js';
import { useEffect, type MouseEvent, type ReactElement } from 'react';
import innerText from 'react-innertext';
import { type Props } from '../../components/link/index.js';
import useEmit from '../../hooks/use-emit/index.js';
import useTheme from '../../hooks/use-theme.js';

export default function Link({
  children,
  className,
  feature,
  href,
  label: ariaLabel,
  title,
}: Props): ReactElement {
  // Contexts
  const emit = useEmit();
  const router = useRouter();
  const { primaryHex } = useTheme();

  // Effects
  useEffect((): void => {
    if (typeof href === 'undefined') {
      return;
    }

    router.prefetch(href);
  }, [href, router]);

  return (
    <a
      aria-label={ariaLabel}
      className={className}
      href={href}
      title={title}
      onClick={(e: MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();

        router.push(href);
        emit('click', {
          feature,
          label: innerText(children),
          url: href,
        });
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
