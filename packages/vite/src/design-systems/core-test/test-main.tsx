import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { MainProps } from '../core/main-props.js';
import type { DocumentProps } from '../core/document-props.js';

interface Options {
  readonly Document: ComponentType<DocumentProps>;
}

export default function testMain(
  Main: ComponentType<MainProps>,
  { Document }: Options,
): void {
  describe('Main', (): void => {
    it('should be main content', (): void => {
      const { getByRole } = render(
        <Document>
          <Main>Test content</Main>
        </Document>,
      );

      expect(getByRole('main')).toHaveTextContent('Test content');
    });
  });
}
