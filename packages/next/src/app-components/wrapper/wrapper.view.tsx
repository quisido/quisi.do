'use client';

import I18n, { useTranslate, type TranslateFunction } from 'lazy-i18n';
import { useSelectedLayoutSegment } from 'next/navigation.js';
import { type PropsWithChildren, type ReactElement, useMemo } from 'react';
import Wrapper from '../../components/wrapper';
import type Breadcrumb from '../../types/breadcrumb';
import { useNotifications } from '../../contexts/notifications';

export default function AppWrapper({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  // Contexts
  const [notifications] = useNotifications();
  const segment: string | null = useSelectedLayoutSegment();
  const translate: TranslateFunction = useTranslate();

  return (
    <Wrapper
      notifications={notifications}
      breadcrumbs={useMemo((): readonly Breadcrumb[] => {
        switch (segment) {
          case null:
            return [];

          case 'charities':
            return [
              {
                children: 'Charities',
                path: '/charities',
              },
            ];

          case 'cloudflare-workers-ai':
            return [
              {
                children: 'Cloudflare Workers AI',
                path: '/cloudflare-workers-ai/',
              },
            ];

          case 'dashboard':
            return [
              {
                children: translate('Dashboard') ?? '...',
                path: '/dashboard/',
              },
            ];

          case 'packages':
            return [
              {
                children: translate('Packages') ?? '...',
                path: '/packages/',
              },
            ];

          case 'publications':
            return [
              {
                children: translate('Publications') ?? '...',
                path: '/publications/',
              },
            ];

          case 'quotes':
            return [
              {
                children: translate('Quotes') ?? '...',
                path: '/quotes/',
              },
            ];

          case 'spritesheet2gif':
            return [
              {
                children: 'Sprite sheet to GIF',
                path: '/spritesheet2gif/',
              },
            ];

          default:
            throw new Error(`Unknown breadcrumbs segment: ${segment}`);
        }
      }, [segment, translate])}
      fallback={useMemo((): ReactElement | undefined => {
        switch (segment) {
          case null:
            return;
          case 'charities':
            return <>Loading charities</>;
          case 'cloudflare-workers-ai':
            return <>Loading Cloudflare Workers AI</>;
          case 'dashboard':
            return <I18n>Loading dashboard</I18n>;
          case 'packages':
            return <I18n>Loading packages</I18n>;
          case 'publications':
            return <I18n>Loading publications</I18n>;
          case 'quotes':
            return <I18n>Loading quotes</I18n>;
          case 'spritesheet2gif':
            return <>...</>;
          default:
            throw new Error(`Unknown fallback segment: ${segment}`);
        }
      }, [segment])}
    >
      {children}
    </Wrapper>
  );
}
