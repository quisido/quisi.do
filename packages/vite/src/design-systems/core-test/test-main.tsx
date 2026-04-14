import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
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
      const { getByName } = render(
        <Document>
          <Main label="Test main">Test content</Main>
        </Document>,
      );

      getByName('main', 'Test main');
    });
  });
}
