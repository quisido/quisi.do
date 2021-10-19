import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';

interface State {
  readonly ariaLabel: string | undefined;
  readonly expandText: string | undefined;
  readonly lastIndex: number;
}

const LAST_INDEX_OFFSET = -1;

export default function useWrapperMuiBreadcrumbs(
  breadcrumbs: readonly unknown[],
): State {
  const translate: TranslateFunction = useTranslate();

  return {
    ariaLabel: translate('breadcrumb'),
    expandText: translate('Show path'),
    lastIndex: breadcrumbs.length + LAST_INDEX_OFFSET,
  };
}
