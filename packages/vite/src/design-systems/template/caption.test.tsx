import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Caption } from './index.js';

describe('Caption', (): void => {
  it('should be a caption', (): void => {
    const { getByRole } = render(
      <table>
        <Caption label="Test caption">Test caption content</Caption>
        <tbody>
          <tr>
            <td>Test cell</td>
          </tr>
        </tbody>
      </table>,
    );

    getByRole('caption', { name: 'Test caption' });
  });
});
