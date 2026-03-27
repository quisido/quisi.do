import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { RowHeader } from './index.js';

describe('RowHeader', (): void => {
  it('should be a row header', (): void => {
    const { getByRole } = render(
      <table>
        <tbody>
          <tr>
            <RowHeader>Test row header</RowHeader>
          </tr>
        </tbody>
      </table>,
    );

    getByRole('rowheader', { name: 'Test row header' });
  });
});
