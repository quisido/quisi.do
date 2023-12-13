import { type MouseEvent, type ReactElement, useEffect } from 'react';
import { type Props } from '../../../components/link';
import useEmit from '../../../hooks/use-emit';
import useTheme from '../../../hooks/use-theme';
import { useRouter } from 'next/navigation';
import isHrefBlank from '../../../utils/is-href-blank';
import innerText from 'react-innertext';

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
  const { primaryFontWeight, primaryHex } = useTheme();

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
        fontWeight: primaryFontWeight,
      }}
    >
      {children}
    </a>
  );
}
