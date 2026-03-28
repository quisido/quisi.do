import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { DocumentArticleLayout, Provider } from './index.js';

describe('DocumentArticleLayout', (): void => {
  it('should render main and article with a label', (): void => {
    const { getByRole } = render(
      <Provider>
        <DocumentArticleLayout label="Test document">
          Test content
        </DocumentArticleLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test document' });
    getByRole('article', { name: 'Test document' });
  });

  it('should render complementary content for the table of contents', (): void => {
    const { getByRole } = render(
      <Provider>
        <DocumentArticleLayout
          label="Document with TOC"
          tableOfContents="Test TOC"
        >
          Test content
        </DocumentArticleLayout>
      </Provider>,
    );

    getByRole('complementary');
  });

  it('should support headings', (): void => {
    const { getByRole } = render(
      <Provider>
        <DocumentArticleLayout heading="Test heading">
          Test content
        </DocumentArticleLayout>
      </Provider>,
    );

    getByRole('article', { name: 'Test heading' });
  });
});
