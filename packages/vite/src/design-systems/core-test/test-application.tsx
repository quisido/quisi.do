import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ApplicationProps } from '../core/application-props.js';
import type { BannerProps } from '../core/banner-props.js';
import type { ContentInfoProps } from '../core/content-info-props.js';

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
      const { getByRole } = render(
        <Application label="Test application">Test content</Application>,
      );

      getByRole('application', { name: 'Test application' });
    });

    it('should render a banner', (): void => {
      const { getByRole } = render(
        <Application banner="Test banner">Test content</Application>,
      );

      expect(getByRole('banner').textContent).toBe('Test banner');
    });

    it('should not contain more than 1 banner', (): void => {
      expect((): void => {
        render(
          <Application banner="First banner">
            <Banner>Second banner</Banner>
          </Application>,
        );
      }).toThrow('An application or document cannot own multiple banners.');
    });

    it('should render content info', (): void => {
      const { getByRole } = render(
        <Application contentInfo="Test content info">Test content</Application>,
      );

      expect(getByRole('contentinfo').textContent).toBe('Test content info');
    });

    it('should not contain more than 1 content info', (): void => {
      expect((): void => {
        render(
          <Application contentInfo="First content info">
            <ContentInfo>Second content info</ContentInfo>
          </Application>,
        );
      }).toThrow(
        'An application or document cannot own multiple content info.',
      );
    });
  });
}
