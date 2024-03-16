import { useRouter } from 'next/navigation.js';
import { type MouseEvent, type ReactElement, useEffect } from 'react';
import innerText from 'react-innertext';
import { type Props } from '../../components/link/index.js';
import useEmit from '../../hooks/use-emit/index.js';
import useTheme from '../../hooks/use-theme.js';
import isHrefBlank from '../../utils/is-href-blank.js';

export default function Link({
  children,
  feature,
  href,
  label: ariaLabel,
  title,
}: Props): ReactElement {
  const isBlank: boolean = isHrefBlank(href);

  // Contexts
  const emit = useEmit();
  const router = useRouter();
  const { primaryHex } = useTheme();

  // Effects
  useEffect((): void => {
    if (isBlank || typeof href === 'undefined') {
      return;
    }

    router.prefetch(href);
  }, [href, isBlank, router]);

  return (
    <a
      aria-label={ariaLabel}
      href={href}
      title={title}
      onClick={(e: MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();

        const label: string = innerText(children);
        if (isBlank) {
          window.open(href, '_blank');
          emit('click', {
            feature,
            label,
            target: '_blank',
            url: href,
          });
          return;
        }

        router.push(href);
        emit('click', {
          feature,
          label,
          target: '_self',
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
