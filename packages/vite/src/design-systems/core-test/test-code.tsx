import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { CodeProps } from '../core/code-props.js';

export default function testCode(Code: ComponentType<CodeProps>): void {
  describe('Code', (): void => {
    it('should be code', (): void => {
      const { getByRole } = render(
        <>
          <span id="test-id">Test description</span>
          <Code describedBy="test-id">Test code</Code>
        </>,
      );
      getByRole('code', { description: 'Test description' });
    });
  });
}
