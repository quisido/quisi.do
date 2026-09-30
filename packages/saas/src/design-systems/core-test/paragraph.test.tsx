import { describe, expect, it } from 'vitest';

import importTestedDesignSystem from './import-tested-design-system.js';
import render from './render.js';

const { Paragraph } = await importTestedDesignSystem();

describe('Paragraph', (): void => {
  it('should be a paragraph', (): void => {
    const { getByRole } = render(<Paragraph>Test paragraph</Paragraph>);
    const paragraph: HTMLElement = getByRole('paragraph');
    expect(paragraph).toMatchTextContent('Test paragraph');
  });
});
