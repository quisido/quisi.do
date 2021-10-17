import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import RetryAction from '../../components/retry-action';
import useNpmDownloads from '../../hooks/use-npm-downloads';
import mapUnknownToString from '../../map/map-unknown-to-string';
import type Breadcrumb from '../../types/breadcrumb';
import type Notification from '../../types/notification';

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
          onAction: refetch,
          type: 'error',
        });
      }
      return newNotifications;
    }, [error, refetch]),
  };
}
