import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ProductDetailLayout, Provider } from './index.js';

describe('ProductDetailLayout', (): void => {
  it('should render a media region and complementary content', (): void => {
    const { getByRole } = render(
      <Provider>
        <ProductDetailLayout label="Test product" media="Test media">
          Test product info
        </ProductDetailLayout>
      </Provider>,
    );

    getByRole('main', { name: 'Test product' });
    getByRole('region', { name: 'Media' });
    getByRole('complementary');
  });
});
