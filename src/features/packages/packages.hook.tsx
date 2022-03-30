import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import RetryAction from '../../components/retry-action';
import useNpmDownloads from '../../hooks/use-npm-downloads';
import type Breadcrumb from '../../types/breadcrumb';
import type Notification from '../../types/notification';
import mapUnknownToString from '../../utils/map-unknown-to-string';

interface State {
  readonly breadcrumbs: readonly Breadcrumb[];
  readonly notifications: readonly Notification[];
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

    notifications: useMemo((): readonly Notification[] => {
      const newNotifications: Notification[] = [];
      if (error !== null) {
        newNotifications.push({
          CallToAction: RetryAction,
          message: mapUnknownToString(error),
          type: 'error',
          onAction: (): void => {
            void refetch();
          },
        });
      }
      return newNotifications;
    }, [error, refetch]),
  };
}
