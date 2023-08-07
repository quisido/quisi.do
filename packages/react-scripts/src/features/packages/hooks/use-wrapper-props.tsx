import type { TranslateFunction } from 'lazy-i18n';
import I18n, { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import mapUnknownToString from 'unknown2string';
import RetryAction from '../../../components/retry-action';
import type { Props as WrapperProps } from '../../../components/wrapper';
import useNpmDownloads from '../../../hooks/use-npm-downloads';
import type Breadcrumb from '../../../types/breadcrumb';
import type Notification from '../../../types/notification';

export default function usePackagesWrapperProps(): Omit<
  WrapperProps,
  'children'
> {
  // Contexts
  const { error, refetch } = useNpmDownloads();
  const translate: TranslateFunction = useTranslate();

  return {
    contentType: 'table',
    fallback: <I18n>Loading packages</I18n>,
    toolsHide: true,

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
