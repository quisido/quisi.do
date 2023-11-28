import { type IconProps } from '@cloudscape-design/components/icon';
import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import {
  type HTMLAttributeAnchorTarget,
  type ReactNode,
  useCallback,
  useMemo,
} from 'react';
import innerText from 'react-innertext';
import useEvent from '../../../../hooks/use-event/use-event';
import isHrefBlank from '../../../../utils/is-href-blank';

interface Props {
  readonly category: string;
  readonly children: ReactNode;
  readonly href: string | undefined;
  readonly onClick?: VoidFunction | undefined;
}

interface State {
  readonly handleClick: VoidFunction;
  readonly iconAlt: string | undefined;
  readonly iconName: IconProps.Name | undefined;
  readonly target: HTMLAttributeAnchorTarget;
}

export default function useCloudscapeDesignButton({
  category,
  children,
  href,
  onClick,
}: Props): State {
  const isBlank: boolean = isHrefBlank(href);
  const label: string = innerText(children);
  const target: HTMLAttributeAnchorTarget = isBlank ? '_blank' : '_self';

  // Contexts
  const emit = useEvent();
  const translate: TranslateFunction = useTranslate();

  return {
    iconName: isBlank ? 'external' : undefined,
    target,

    handleClick: useCallback((): void => {
      if (typeof onClick === 'function') {
        onClick();
      }

      emit('click', {
        category,
        label,
        target,
        url: href,
      });
    }, [category, emit, href, label, onClick, target]),

    iconAlt: useMemo((): string | undefined => {
      if (!isBlank) {
        return;
      }
      return translate('external');
    }, [isBlank, translate]),
  };
}
