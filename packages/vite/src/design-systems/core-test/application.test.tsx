import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

/**
 * TODO: Since applications use "focus mode" which removes the screen reader's
 * access to keyboard management, an `Application` component must do one of
 * these three things (and the API for enforcing this is not clearly defined;
 * that is the TODO):
 * - Point either describedBy or labelledBy to a focusable element ("Associate
 *   the content with a focusable element using aria-labelledby or
 *   aria-describedby").
 * - Place the content in a focusable element that has role document or article.
 * - Manage focus of accessibility descendants as described in Managing Focus,
 *   updating the value of aria-activedescendant to reference the element
 *   containing the focused content.
 */
const { Application, Article, Document } = await importTestedDesignSystem();

describe('Application', (): void => {
  it('should be an application', (): void => {
    const { getByRole } = render(
      <Application label="Application">Content</Application>,
    );

    const application: HTMLElement = getByRole('application');
    expect(application).toHaveTextContent('Content');
  });

  it('should support a banner', (): void => {
    const { getByRole } = render(
      <Application banner="Application banner" label="Bannered Application">
        Content
      </Application>,
    );

    const banner: HTMLElement = getByRole('banner');
    expect(banner).toHaveTextContent('Application banner');
  });

  it('should support a description', (): void => {
    const { getByDescription } = render(
      <>
        <span id="test-described-application-label-id">
          This application is described.
        </span>
        <Application
          describedBy="test-described-application-label-id"
          label="Described application"
        >
          Content
        </Application>
      </>,
    );

    getByDescription('application', 'This application is described.');
  });

  it('should support a heading', (): void => {
    const { getByName } = render(
      <Application heading="Heading">Content</Application>,
    );

    getByName('application', 'Heading');
  });

  it('should support a label', (): void => {
    const { getByName } = render(
      <Application label="Labelled Application">Content</Application>,
    );

    getByName('application', 'Labelled Application');
  });

  it('should support a role description', (): void => {
    const { getByName } = render(
      <Application label="Described role" roleDescription="test app">
        Content
      </Application>,
    );

    const application: HTMLElement = getByName(
      'application',
      'Described role',
    );
    expect(application).toHaveAttribute('aria-roledescription', 'test app');
  });

  it('should support an external label', (): void => {
    const { getByName } = render(
      <>
        <span id="test-application-label-id">Application label</span>
        <Application labelledBy="test-application-label-id">
          Content
        </Application>
      </>,
    );

    getByName('application', 'Application label');
  });

  it('should support content info', (): void => {
    const { getByRole } = render(
      <Application
        contentInfo="Test content info"
        heading="Application with content info"
      >
        Content
      </Application>,
    );

    const contentInfo: HTMLElement = getByRole('contentinfo');
    expect(contentInfo).toHaveTextContent('Test content info');
  });

  /**
   * A tabbable article allows users to leave the application's "focus mode"
   * and return to browse mode.
   */
  it('should support focusable article content', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Application label="Focusable document">
        <Article heading="Tabbable article" tabbable>
          Article content
        </Article>
      </Application>,
    );

    const article: HTMLElement = getByName('article', 'Tabbable article');
    await tab();
    expect(article).toHaveFocus();
  });

  /**
   * A tabbable document allows users to leave the application's "focus mode"
   * and return to browse mode.
   */
  it('should support focusable document content', async (): Promise<void> => {
    const { getByRole, tab } = render(
      <Application label="Focusable document">
        <Document tabbable>Document content</Document>
      </Application>,
    );

    const document: HTMLElement = getByRole('document');
    await tab();
    expect(document).toHaveFocus();
  });
});
