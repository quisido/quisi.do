import type {
  HTMLAttributeAnchorTarget,
  MutableRefObject,
  ReactNode,
} from 'react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { useLink as useNextAwsuiLink } from 'use-next-awsui';
import isHrefBlank from '../../../../utils/is-href-blank';
import mapLinkSpanToAnchorElement from './utils/map-link-span-to-anchor-element';
import useEvent from '../../../../hooks/use-event/use-event';
import filterNodesByImage from '../../../../utils/filter-nodes-by-image';
import { NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import { LinkProps } from '@cloudscape-design/components/link';
import isHrefExternal from '../../../../utils/is-href-external';

interface Props {
  readonly category: string;
  readonly children: ReactNode;
  readonly href: string;
  readonly title: string | undefined;
}

interface State {
  readonly external: boolean;
  readonly handleFollow: (event: CustomEvent<LinkProps.FollowDetail>) => void;
  readonly ref: MutableRefObject<HTMLSpanElement | null>;
  readonly rel: string | undefined;
  readonly target: HTMLAttributeAnchorTarget;
}

export default function useCloudscapeDesignLink({
  category,
  children,
  href,
  title,
}: Props): State {
  const isBlank: boolean = isHrefBlank(href);
  const target: HTMLAttributeAnchorTarget = isBlank ? '_blank' : '_self';

  // Contexts
  const emit = useEvent();

  // States
  const ref: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  const { handleFollow } = useNextAwsuiLink({
    href,
  });

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
    external: isHrefExternal(href) && !filterNodesByImage(children),
    ref,
    rel: isBlank ? 'nofollow noopener noreferrer' : undefined,
    target,

    handleFollow: useCallback(
      (e: CustomEvent<LinkProps.FollowDetail>): void => {
        emit('click', {
          category,
          label: title,
          target,
          url: href,
        });
        handleFollow(e);
      },
      [category, emit, handleFollow, href, target, title],
    ),
  };
}
