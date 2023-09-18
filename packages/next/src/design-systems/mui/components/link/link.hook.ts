import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from 'next/navigation';
import type { HTMLAttributeAnchorTarget, MouseEvent } from 'react';
import useEffectEvent from '../../../../hooks/use-effect-event';
import useEvent from '../../../../hooks/use-event/use-event';
import filterHrefByBlank from '../../../../utils/filter-href-by-blank';

interface Props {
  readonly category: string;
  readonly href: string;
  readonly title: string;
}

interface State {
  readonly rel: string | undefined;
  readonly handleClick: (
    event: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>,
  ) => void;
}

export default function useMuiLink({
  category,
  href,
  title,
}: Readonly<Props>): State {
  const isBlank: boolean = filterHrefByBlank(href);

  // Contexts
  const emit = useEvent();
  const router: AppRouterInstance = useRouter();

  // States
  return {
    rel: isBlank ? 'nofollow noopener noreferrer' : undefined,

    handleClick: useEffectEvent(
      (e: Readonly<MouseEvent<Readonly<HTMLAnchorElement>>>): void => {
        e.preventDefault();
        const target: HTMLAttributeAnchorTarget = isBlank ? '_blank' : '_self';
        emit('click', {
          category,
          label: title,
          target,
          url: href,
        });

        if (isBlank) {
          window.open(href, '_blank');
          return;
        }

        router.push(href);
      },
    ),
  };
}
