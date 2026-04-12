import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ApplicationProps } from '../core/application-props.js';
import type { BannerProps } from '../core/banner-props.js';
import type { ContentInfoProps } from '../core/content-info-props.js';
import render from './render.js';

interface Options {
  readonly Banner: ComponentType<BannerProps>;
  readonly ContentInfo: ComponentType<ContentInfoProps>;
}

export default function testApplication(
  Application: ComponentType<ApplicationProps>,
  { Banner, ContentInfo }: Options,
): void {
  describe('Application', (): void => {
    it('should be an application', (): void => {
      const { getByName } = render(
        <Application label="Test application">Test content</Application>,
      );

      getByName('application', 'Test application');
    });

    it('should render a banner', (): void => {
      const { getByRole } = render(
        <Application banner="Test banner">Test content</Application>,
      );

      const banner: HTMLElement = getByRole('banner');
      expect(banner.textContent).toBe('Test banner');
    });

    it('should not contain more than 1 banner', (): void => {
      const { expectToHaveThrown } = render(
        <Application banner="First banner">
          <Banner>Second banner</Banner>
        </Application>,
      );

      expectToHaveThrown(
        'An application or document cannot own multiple banners.',
      );
    });

    it('should render content info', (): void => {
      const { getByRole } = render(
        <Application contentInfo="Test content info">Test content</Application>,
      );

      const contentInfo: HTMLElement = getByRole('contentinfo');
      expect(contentInfo.textContent).toBe('Test content info');
    });

    it('should not contain more than 1 content info', (): void => {
      const { expectToHaveThrown } = render(
        <Application contentInfo="First content info">
          <ContentInfo>Second content info</ContentInfo>
        </Application>,
      );
      expectToHaveThrown(
        'An application or document cannot own multiple content info.',
      );
    });
  });
}
