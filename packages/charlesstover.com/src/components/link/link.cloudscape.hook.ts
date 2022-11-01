import type { HTMLAttributeAnchorTarget, MutableRefObject } from 'react';
import { useLayoutEffect, useRef } from 'react';
import filterHrefByBlank from '../../utils/filter-href-by-blank';
import filterHrefByExternal from '../../utils/filter-href-by-external';
import mapCloudscapeLinkSpanToAnchorElement from './utils/map-cloudscape-link-span-to-anchor-element';

interface Props {
  readonly href: string;
  readonly title: string | undefined;
}

interface State {
  readonly external: boolean;
  readonly ref: MutableRefObject<HTMLSpanElement | null>;
  readonly rel: string | undefined;
  readonly target: HTMLAttributeAnchorTarget;
}

export default function useCloudscapeLink({
  href,
  title,
}: Readonly<Props>): State {
  const isBlank: boolean = filterHrefByBlank(href);

  // States
  const ref: MutableRefObject<HTMLSpanElement | null> = useRef(null);

  useLayoutEffect((): VoidFunction | undefined => {
    if (ref.current === null || typeof title !== 'string') {
      return;
    }

    const a: HTMLAnchorElement = mapCloudscapeLinkSpanToAnchorElement(
      ref.current,
    );
    a.setAttribute('title', title);

    return (): void => {
      a.removeAttribute('title');
    };
  }, [title]);

  return {
    external: filterHrefByExternal(href),
    ref,
    rel: isBlank ? 'nofollow noopener noreferrer' : undefined,
    target: isBlank ? '_blank' : '_self',
  };
}
