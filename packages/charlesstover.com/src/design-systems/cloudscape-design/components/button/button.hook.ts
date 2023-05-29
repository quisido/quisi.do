import type { IconProps } from '@cloudscape-design/components/icon';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import filterHrefByBlank from '../../../../utils/filter-href-by-blank';

interface Props {
  readonly href: string | undefined;
}

interface State {
  readonly iconAlt: string | undefined;
  readonly iconName: IconProps.Name | undefined;
  readonly target: '_blank' | undefined;
}

export default function useCloudscapeDesignButton({
  href,
}: Readonly<Props>): State {
  const translate: TranslateFunction = useTranslate();

  const isBlank: boolean = filterHrefByBlank(href);
  return {
    iconName: isBlank ? 'external' : undefined,
    target: isBlank ? '_blank' : undefined,

    iconAlt: useMemo((): string | undefined => {
      if (!isBlank) {
        return;
      }
      return translate('external');
    }, [isBlank, translate]),
  };
}
