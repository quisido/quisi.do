import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Article } = await importTestedDesignSystem();

describe('Article', (): void => {
  it('should support a heading', (): void => {
    const { getByName } = render(
      <Article heading="Heading">Content</Article>,
    );

    getByName('article', 'Heading');
  });

  it('should support an external label', (): void => {
    const { getByName } = render(
      <>
        <span id="external-article-label">Labelled Article</span>
        <Article labelledBy="external-article-label">Content</Article>
      </>,
    );

    getByName('article', 'Labelled Article');
  });

  it('should support keyboard navigation', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Article heading="Tabbable" tabbable>
        Content
      </Article>,
    );

    const article: HTMLElement = getByName('article', 'Tabbable');
    await tab();
    expect(article).toHaveFocus();
  });

  it('should support nested article names', (): void => {
    const { getByName } = render(
      <Article heading="Parent article">
        <Article heading="Related comment">Comment content</Article>
      </Article>,
    );

    getByName('article', 'Related comment');
  });
});
