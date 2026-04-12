import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { CodeProps } from '../core/code-props.js';
import render from './render.js';

export default function testCode(Code: ComponentType<CodeProps>): void {
  describe('Code', (): void => {
    it('should be code', (): void => {
      const { getByDescription } = render(
        <>
          <span id="test-code-description-id">Test description</span>
          <Code describedBy="test-code-description-id">Test code</Code>
        </>,
      );
      getByDescription('code', 'Test description');
    });
  });
}
