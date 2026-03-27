import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Cell } from './index.js';

describe('Cell', (): void => {
  it('should be a cell', (): void => {
    const { getByRole } = render(
      <table>
        <tbody>
          <tr>
            <Cell>Test cell</Cell>
          </tr>
        </tbody>
      </table>,
    );

    getByRole('cell', { name: 'Test cell' });
  });
});
