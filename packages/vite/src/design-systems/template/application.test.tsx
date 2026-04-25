import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Application, Banner, ContentInfo } from './index.js';

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
    }).toThrow('An application or document cannot own multiple content info.');
  });
});
