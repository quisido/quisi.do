import type {
  HTMLAttributeAnchorTarget,
  MutableRefObject,
  ReactNode,
} from 'react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import filterHrefByBlank from '../../../../utils/filter-href-by-blank';
import filterHrefByExternal from '../../../../utils/filter-href-by-external';
import mapLinkSpanToAnchorElement from './utils/map-link-span-to-anchor-element';
import useEvent from '../../../../hooks/use-event/use-event';
import filterNodesByImage from '../../../../utils/filter-nodes-by-image';

interface Props {
  readonly category: string;
  readonly children: ReactNode;
  readonly href: string;
  readonly title: string | undefined;
}

interface State {
  readonly external: boolean;
  readonly handleFollow: VoidFunction;
  readonly ref: MutableRefObject<HTMLSpanElement | null>;
  readonly rel: string | undefined;
  readonly target: HTMLAttributeAnchorTarget;
}

export default function useCloudscapeDesignLink({
  category,
  children,
  href,
  title,
}: Readonly<Props>): State {
  const isBlank: boolean = filterHrefByBlank(href);
  const target: HTMLAttributeAnchorTarget = isBlank ? '_blank' : '_self';

  // Contexts
  const emit = useEvent();

  // States
  const ref: MutableRefObject<HTMLSpanElement | null> = useRef(null);

  // Effects
  useLayoutEffect((): VoidFunction | undefined => {
    if (ref.current === null || typeof title !== 'string') {
      return;
    }

    const a: HTMLAnchorElement = mapLinkSpanToAnchorElement(ref.current);
    a.setAttribute('title', title);

    return (): void => {
      a.removeAttribute('title');
    };
  }, [title]);

  return {
    external: filterHrefByExternal(href) && !filterNodesByImage(children),
    ref,
    rel: isBlank ? 'nofollow noopener noreferrer' : undefined,
    target,

    handleFollow: useCallback((): void => {
      emit('click', {
        category,
        label: title,
        target,
        url: href,
      });
    }, [category, emit, href, target, title]),
  };
}
