import { BreadcrumbGroupProps } from '@awsui/components-react/breadcrumb-group';
import { FlashbarProps } from '@awsui/components-react/flashbar';
import I18n from 'lazy-i18n';
import { TranslateFunction, useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import useNpmDownloads from '../../hooks/use-npm-downloads';
import mapUnknownToString from '../../map/map-unknown-to-string';

interface State {
  breadcrumbs: BreadcrumbGroupProps.Item[];
  notifications: FlashbarProps.MessageDefinition[];
}

export default function usePackages(): State {
  // Contexts
  const { error, refetch } = useNpmDownloads();
  const translate: TranslateFunction = useTranslate();

  return {
    breadcrumbs: useMemo(
      (): BreadcrumbGroupProps.Item[] => [
        {
          href: '/packages',
          text: translate('Packages') || '...',
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
          onButtonClick(): void {
            refetch();
          },
          type: 'error',
        });
      }
      return newNotifications;
    }, [error, refetch]),
  };
}
