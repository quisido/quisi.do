import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Cell, Row } from './index.js';

describe('Row', (): void => {
  it('should be a row', (): void => {
    const { getByRole } = render(
      <table>
        <tbody>
          <Row label="Test row">
            <Cell>Test cell</Cell>
          </Row>
        </tbody>
      </table>,
    );

    getByRole('row', { name: 'Test row' });
  });
});
