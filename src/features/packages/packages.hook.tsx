import type { FlashbarProps } from '@awsui/components-react/flashbar';
import type { TranslateFunction } from 'lazy-i18n';
import I18n, { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import useNpmDownloads from '../../hooks/use-npm-downloads';
import mapUnknownToString from '../../map/map-unknown-to-string';
import type Breadcrumb from '../../types/breadcrumb';

interface State {
  readonly breadcrumbs: readonly Breadcrumb[];
  readonly notifications: readonly FlashbarProps.MessageDefinition[];
}

export default function usePackages(): State {
  // Contexts
  const { error, refetch } = useNpmDownloads();
  const translate: TranslateFunction = useTranslate();

  return {
    breadcrumbs: useMemo(
      (): readonly Breadcrumb[] => [
        {
          children: translate('Packages') ?? '...',
          path: '/packages',
        },
      ],
      [translate],
    ),

    notifications: useMemo((): FlashbarProps.MessageDefinition[] => {
      const newNotifications: FlashbarProps.MessageDefinition[] = [];
      if (error !== null) {
        newNotifications.push({
          content: mapUnknownToString(error),
          buttonText: <I18n>Retry</I18n>,
          dismissible: true,
          header: <I18n>An error occurred.</I18n>,
          onButtonClick: refetch,
          type: 'error',
        });
      }
      return newNotifications;
    }, [error, refetch]),
  };
}
